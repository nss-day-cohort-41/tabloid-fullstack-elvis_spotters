using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        Subscription GetById(int id);
        void Add(Subscription subscription);
        bool CheckSubscription(int subscriberId, int providerId);
        Subscription GetSubScriptionByMembers(int subscriberId, int providerId);
        void Update(Subscription subscription);
    }
}