using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }

        public Subscription GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                        SubscriberUserProfileId, ProviderUserProfileId,
                                        BeginDateTime, EndDateTime
                                        FROM Subscription
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    Subscription subscription = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        subscription.Id = id;
                        subscription.SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId");
                        subscription.ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId");
                        subscription.BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime");
                        subscription.EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime");
                    }
                    reader.Close();

                    return subscription;
                }
            }
        }

        public bool CheckSubscription(int subscriberId, int providerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id FROM Subscription
                                         WHERE SubscriberUserProfileId = @subscriberId
                                               AND ProviderUserProfileId = @providerId
                                               AND EndDateTime IS NULL";
                    DbUtils.AddParameter(cmd, "@subscriberId", subscriberId);
                    DbUtils.AddParameter(cmd, "@providerId", providerId);
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        reader.Close();
                        return true;
                    }

                    reader.Close();
                    return false;
                }
            }
        }

        public Subscription GetSubScriptionByMembers(int subscriberId, int providerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, SubscriberUserProfileId, ProviderUserProfileId,
                                               BeginDateTime, EndDateTime
                                          FROM Subscription
                                         WHERE SubscriberUserProfileId = @subscriberId
                                               AND ProviderUserProfileId = @providerId
                                               AND EndDateTime IS NULL;";
                    DbUtils.AddParameter(cmd, "@subscriberId", subscriberId);
                    DbUtils.AddParameter(cmd, "@providerId", providerId);
                    var subscription = new Subscription();
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        subscription.Id = DbUtils.GetInt(reader, "Id");
                        subscription.SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId");
                        subscription.ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId");
                        subscription.BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime");
                        subscription.EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime");
                    }

                    reader.Close();
                    return subscription;
                }
            }
        }

        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId,
                                                                   BeginDateTime)
                                         OUTPUT INSERTED.Id
                                         VALUES (@SubscriberId, @ProviderId, @BeginDateTime)";

                    DbUtils.AddParameter(cmd, "@SubscriberId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Subscription 
                                           SET SubscriberUserProfileId = @SubscriberUserProfileId,
                                               ProviderUserProfileId = @ProviderUserProfileId,
                                               BeginDateTime = @BeginDateTime,
                                               EndDateTime = @EndDateTime
                                         WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", subscription.EndDateTime);
                    DbUtils.AddParameter(cmd, "@Id", subscription.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
