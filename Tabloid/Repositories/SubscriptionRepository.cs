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
                                           AND ProviderUserProfileId = @providerId";
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
    }
}
