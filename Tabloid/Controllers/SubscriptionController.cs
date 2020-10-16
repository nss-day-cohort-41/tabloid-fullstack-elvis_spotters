using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository,
                                      IUserProfileRepository userProfileRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var subscription = _subscriptionRepository.GetById(id);
            if (subscription == null)
            {
                return NotFound();
            }

            return Ok(subscription);
        }

        [HttpGet("check")]
        public IActionResult CheckSubscription(string id)
        {
            try
            {
                int providerId = Int32.Parse(id);
                var currentUser = GetCurrentUserProfile();
                return Ok(_subscriptionRepository.CheckSubscription(currentUser.Id, providerId));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            subscription.BeginDateTime = DateTime.Now;

            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
