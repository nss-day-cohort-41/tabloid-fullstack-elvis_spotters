using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class  UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
        [Authorize]
        [HttpGet("users")]
        public IActionResult GetAllUsers()
            {
            try
                {
                return Ok(_userProfileRepository.GetAll());
                }
            catch
                {
                return NotFound();
                }
            }
        [Authorize]
        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
            {
            try
                {
                return Ok(_userProfileRepository.GetUserById(id));
                }
            catch
                {

                return NotFound();
                }
            }
        [Authorize]
        [HttpPut("active")]
        public  IActionResult IsActive(UserProfile user)
            {
            try
                {
               _userProfileRepository.isActive(user);
                return Ok(_userProfileRepository.GetUserById(user.Id));
                }
            catch
                {
                return NotFound();
                }
            }
        [Authorize]
        [HttpPut("admin")]
        public IActionResult IsAdmin(UserProfile user)
            {
            try
                {
                _userProfileRepository.isActive(user);
                return Ok(_userProfileRepository.GetUserById(user.Id));
                }
            catch
                {
                return NotFound();
                }
            }
        }
}
