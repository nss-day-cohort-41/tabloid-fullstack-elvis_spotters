using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT 
                                    up.FirstName as UserProfileFirstName, 
                                    up.LastName as UserProfileLastName, 
                                    up.DisplayName as UserProfileDisplayName, 
                                    up.UserTypeId as UserProfileUserTypeId, 
                                    up.Email as UserProfileEmail,
                                    up.ImageLocation as UserProfileImageLocation, 
                                    up.CreateDateTime as UserProfileCreatedDateTime, 
                                    up.Id as UserProfileId,
                                    up.IsActive as IsActive,
                                    u.Id as UserTypeId,
                                    u.Name as UserTypeName
                                    FROM UserProfile up
                                    JOIN UserType u ON u.Id = up.UserTypeId 
                                    WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = UserProfileBuilder(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime, ImageLocation, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<UserProfile> GetAll()
            {
            List<UserProfile> userProfiles = new List<UserProfile>();
            using(SqlConnection conn = Connection)
                {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"
                                        SELECT 
                                        up.FirstName as UserProfileFirstName, 
                                        up.LastName as UserProfileLastName, 
                                        up.DisplayName as UserProfileDisplayName, 
                                        up.UserTypeId as UserProfileUserTypeId, 
                                        up.Email as UserProfileEmail,
                                        up.ImageLocation as UserProfileImageLocation, 
                                        up.CreateDateTime as UserProfileCreatedDateTime, 
                                        up.Id as UserProfileId,
                                        up.IsActive as IsActive,
                                        u.Id as UserTypeId,
                                        u.Name as UserTypeName
                                        FROM UserProfile up
                                        JOIN UserType u ON u.Id = up.UserTypeId 
                                        Order By DisplayName";
                    try
                        {
                    SqlDataReader reader = cmd.ExecuteReader();
                    while(reader.Read())
                        {
                        userProfiles.Add(UserProfileBuilder(reader));
                        }
                        conn.Close();
                        return userProfiles;
                        }
                    catch(Exception ex)
                        {
                        conn.Close();
                        Console.WriteLine(ex.Message);
                        return null;
                        }
                    
                    
                    }
                }
            }
        public UserProfile GetUserById(int id)
            {
            using(SqlConnection conn = Connection)
                {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"
                                        SELECT 
                                        up.FirstName as UserProfileFirstName, 
                                        up.LastName as UserProfileLastName, 
                                        up.DisplayName as UserProfileDisplayName, 
                                        up.UserTypeId as UserProfileUserTypeId, 
                                        up.Email as UserProfileEmail,
                                        up.ImageLocation as UserProfileImageLocation, 
                                        up.CreateDateTime as UserProfileCreatedDateTime,
                                        up.IsActive as IsActive,
                                        up.Id as UserProfileId,
                                        u.Id as UserTypeId,
                                        u.Name as UserTypeName
                                        FROM UserProfile up
                                        JOIN UserType u ON u.Id = up.UserTypeId
                                        WHERE up.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    UserProfile userProfile = null;
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                        {
                        userProfile = UserProfileBuilder(reader);
                        }
                    reader.Close();

                    return userProfile;

                    }
                
                }
            }

        public int CountUserType(int userTypeId)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT COUNT(Id) AS UserCount FROM UserProfile
                                        WHERE UserTypeId = @UserTypeId";
                    DbUtils.AddParameter(cmd, "@UserTypeId", userTypeId);

                    SqlDataReader reader = cmd.ExecuteReader();
                    int userCount = 0;
                    if (reader.Read())
                    {
                        userCount = DbUtils.GetInt(reader, "UserCount");
                    }

                    reader.Close();
                    return userCount;
                }
            }
        }
        public void isActive(UserProfile user)
            {
            using(SqlConnection conn = Connection)
                {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"UPDATE UserProfile 
                                        SET 
                                        FirstName=@FirstName, 
                                        LastName=@LastName, 
                                        DisplayName=@DisplayName,
                                        Email=@Email, 
                                        CreateDateTime=@CreateDateTime, 
                                        ImageLocation=@ImageLocation,
                                        UserTypeId=@UserTypeId, 
                                        IsActive=@IsActive
                                        WHERE Id =@UserProfileId";
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue( "@LastName", user.LastName);
                    cmd.Parameters.AddWithValue("@DisplayName", user.DisplayName);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@CreateDateTime", user.CreateDateTime);
                    cmd.Parameters.AddWithValue("@ImageLocation", user.ImageLocation);
                    cmd.Parameters.AddWithValue("@UserTypeId", user.UserTypeId);
                    cmd.Parameters.AddWithValue("@IsActive", !user.IsActive);
                    cmd.Parameters.AddWithValue("@UserProfileId", user.Id);

                    cmd.ExecuteNonQuery();
                    }
                conn.Close();

                }
            }
        public void isAdmin(UserProfile user)
            {
            using (SqlConnection conn = Connection)
                {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                    {
                    cmd.CommandText = @"UPDATE UserProfile 
                                        SET 
                                        FirstName=@FirstName, 
                                        LastName=@LastName, 
                                        DisplayName=@DisplayName,
                                        Email=@Email, 
                                        CreateDateTime=@CreateDateTime, 
                                        ImageLocation=@ImageLocation,
                                        UserTypeId=@UserTypeId, 
                                        IsActive=@IsActive
                                        WHERE Id =@UserProfileId";
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", user.LastName);
                    cmd.Parameters.AddWithValue("@DisplayName", user.DisplayName);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@CreateDateTime", user.CreateDateTime);
                    cmd.Parameters.AddWithValue("@ImageLocation", user.ImageLocation);
                    cmd.Parameters.AddWithValue("@UserTypeId", user.UserTypeId);
                    cmd.Parameters.AddWithValue("@IsActive", user.IsActive);
                    cmd.Parameters.AddWithValue("@UserProfileId", user.Id);

                    cmd.ExecuteNonQuery();
                    }
                conn.Close();

                }
            }


        public UserProfile UserProfileBuilder(SqlDataReader reader)
            {
            return new UserProfile()
                {
                Id = DbUtils.GetInt(reader,"UserProfileId"),
                FirstName = DbUtils.GetString(reader, "UserProfileFirstName"),
                LastName = DbUtils.GetString(reader, "UserProfileLastName"),
                DisplayName = DbUtils.GetString(reader, "UserProfileDisplayName"),
                Email = DbUtils.GetString(reader, "UserProfileEmail"),
                ImageLocation = DbUtils.GetString(reader, "UserProfileImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreatedDateTime"),
                IsActive = DbUtils.GetBool(reader, "IsActive"),
                UserTypeId = DbUtils.GetInt(reader, "UserProfileUserTypeId"),
                UserType = new UserType()
                    {
                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                    Name = DbUtils.GetString(reader, "UserTypeName")
                    }
                };
            }

        /*
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */
    }
}
