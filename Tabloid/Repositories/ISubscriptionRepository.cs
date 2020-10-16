using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        Subscription GetById(int id);
        void Add(Subscription subscription);
    }
}