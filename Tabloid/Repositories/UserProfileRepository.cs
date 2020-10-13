<<<<<<< HEAD
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
=======
﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
>>>>>>> master
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
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
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
