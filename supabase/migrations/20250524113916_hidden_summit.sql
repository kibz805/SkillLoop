/*
  # Initial SkillLoop Schema

  1. New Tables
    - `profiles`
      - User profiles with extended information
      - Stores name, bio, avatar_url, and other profile data
    
    - `skills`
      - Skills that users can teach or learn
      - Contains skill name, category, description, and level
    
    - `user_skills`
      - Junction table linking users to skills they can teach
      - Includes certification and experience level
    
    - `learning_goals`
      - Skills users want to learn
      - Tracks progress and learning preferences
    
    - `sessions`
      - Learning sessions between users
      - Stores scheduling, status, and session details
    
    - `reviews`
      - Session reviews and ratings
      - Maintains feedback and rating metrics
    
    - `messages`
      - Direct messages between users
      - Handles communication history
    
    - `categories`
      - Skill categories for organization
      - Hierarchical category structure

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure personal data access
*/

-- Create custom types
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'expert');
CREATE TYPE session_status AS ENUM ('pending', 'confirmed', 'completed', 'canceled');

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES categories(id),
  icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  location text,
  website text,
  email text UNIQUE NOT NULL,
  is_verified boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_skills table (skills users can teach)
CREATE TABLE IF NOT EXISTS user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  skill_id uuid REFERENCES skills(id) NOT NULL,
  level skill_level NOT NULL,
  hourly_rate decimal(10,2),
  is_certified boolean DEFAULT false,
  certification_url text,
  years_experience integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create learning_goals table (skills users want to learn)
CREATE TABLE IF NOT EXISTS learning_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  skill_id uuid REFERENCES skills(id) NOT NULL,
  current_level skill_level NOT NULL,
  target_level skill_level NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) NOT NULL,
  teacher_id uuid REFERENCES profiles(id) NOT NULL,
  skill_id uuid REFERENCES skills(id) NOT NULL,
  status session_status DEFAULT 'pending',
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  is_online boolean DEFAULT true,
  meeting_url text,
  price decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) NOT NULL,
  reviewee_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, reviewer_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) NOT NULL,
  recipient_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Categories: Anyone can view
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Profiles: Users can view all profiles but only edit their own
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Skills: Anyone can view
CREATE POLICY "Skills are viewable by everyone" ON skills
  FOR SELECT USING (true);

-- User Skills: Anyone can view, users can manage their own
CREATE POLICY "Anyone can view user skills" ON user_skills
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own skills" ON user_skills
  FOR ALL USING (auth.uid() = user_id);

-- Learning Goals: Users can manage their own goals
CREATE POLICY "Users can manage their own learning goals" ON learning_goals
  FOR ALL USING (auth.uid() = user_id);

-- Sessions: Users can view and manage their own sessions
CREATE POLICY "Users can view their own sessions" ON sessions
  FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() = teacher_id
  );

CREATE POLICY "Users can manage their own sessions" ON sessions
  FOR ALL USING (
    auth.uid() = student_id OR 
    auth.uid() = teacher_id
  );

-- Reviews: Anyone can view, users can create for their sessions
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their sessions" ON reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = session_id
      AND (sessions.student_id = auth.uid() OR sessions.teacher_id = auth.uid())
    )
  );

-- Messages: Users can manage their own messages
CREATE POLICY "Users can manage their own messages" ON messages
  FOR ALL USING (
    auth.uid() = sender_id OR 
    auth.uid() = recipient_id
  );

-- Create functions

-- Function to update profile rating
CREATE OR REPLACE FUNCTION update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2)
      FROM reviews
      WHERE reviewee_id = NEW.reviewee_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE reviewee_id = NEW.reviewee_id
    )
  WHERE id = NEW.reviewee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profile rating when a review is added
CREATE TRIGGER update_profile_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_profile_rating();