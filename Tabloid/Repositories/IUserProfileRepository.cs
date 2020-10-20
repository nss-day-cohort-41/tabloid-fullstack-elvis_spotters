using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAll();
        UserProfile GetUserById(int id);
        int CountUserType(int userTypeId);
        void isActive(UserProfile user);
        void isAdmin(UserProfile user);
    }
}