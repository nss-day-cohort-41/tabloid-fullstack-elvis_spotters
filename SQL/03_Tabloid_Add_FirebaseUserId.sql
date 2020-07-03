USE [Tabloid]
GO

-- Add the FirebaseUserId column if it does not already exist
IF COL_LENGTH('UserProfile', 'FirebaseUserId') IS NULL
BEGIN
  ALTER TABLE UserProfile ADD FirebaseUserId NVARCHAR(28) NULL;
END


-- Insert a firebase user
-- TODO: UPDATE THIS INSERT STATEMENT WITH A VALiD FIREBASE USER ID

DELETE FROM [UserProfile] WHERE [Email] = 'foo@bar.com';

INSERT INTO [UserProfile]
  ([DisplayName], [FirstName], [LastName], [Email], [CreateDateTime], 
   [ImageLocation], [UserTypeId], [FirebaseUserId])
VALUES 
  ('Foo', 'Foo', 'Barington', 'foo@bar.com', '2020-06-20',
   null, 1, '_USE_A_REAL_FIREBASE_USER_ID');


