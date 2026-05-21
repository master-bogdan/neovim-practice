-- OBJECTIVE: Use search, substitute, and global commands to fix these SQL queries
--
-- Tasks:
--   1. Replace all `user_tbl` with `users` using :%s/user_tbl/users/g
--   2. Change all `SELECT *` to `SELECT id, email, name` using cgn (selective)
--      Skip the one in the COUNT query (line 42)
--   3. Add `WHERE deleted_at IS NULL` to every SELECT that lacks it
--      Use :g/SELECT.*FROM.*users/  to find them, then manually add
--   4. Replace `VARCHAR(255)` with `TEXT` everywhere using :%s
--   5. Delete all comment-only lines using :g/^\s*--\s/d (skip the objective block!)
--   6. Copy all CREATE INDEX statements to end of file using :g/CREATE INDEX/t$
--
-- TIMING: Expert 60s | Proficient 120s | Learning 240s

-- User table definition
CREATE TABLE user_tbl (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'member',
    score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Index for email lookups
CREATE INDEX idx_user_tbl_email ON user_tbl (email);

-- Index for role filtering
CREATE INDEX idx_user_tbl_role ON user_tbl (role);

-- Index for soft deletes
CREATE INDEX idx_user_tbl_deleted ON user_tbl (deleted_at) WHERE deleted_at IS NULL;

-- Get active users
SELECT * FROM user_tbl WHERE deleted_at IS NULL ORDER BY created_at DESC;

-- Get user by email
SELECT * FROM user_tbl WHERE email = 'admin@example.com';

-- Count all users (keep SELECT * here)
SELECT COUNT(*) FROM user_tbl;

-- Get admins
SELECT * FROM user_tbl WHERE role = 'admin';

-- Get top scorers
SELECT * FROM user_tbl WHERE score > 100 ORDER BY score DESC LIMIT 10;

-- Update user role
UPDATE user_tbl SET role = 'admin' WHERE email = 'promote@example.com';

-- Soft delete user
UPDATE user_tbl SET deleted_at = NOW() WHERE id = '123e4567-e89b-12d3-a456-426614174000';

-- Get recent signups
SELECT * FROM user_tbl WHERE created_at > NOW() - INTERVAL '7 days' AND deleted_at IS NULL;

-- EXPECTED after all tasks:
-- 1. All user_tbl → users
-- 2. SELECT * → SELECT id, email, name (except COUNT query)
-- 3. Missing WHERE deleted_at IS NULL added to queries that need it
-- 4. All VARCHAR(255) → TEXT
-- 5. Comment lines removed
-- 6. CREATE INDEX statements duplicated at end of file
