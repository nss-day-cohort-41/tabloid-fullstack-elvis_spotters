using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Microsoft.AspNetCore.Authorization;
using Tabloid.Models;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public TagController(ITagRepository tagRepository, IUserProfileRepository userProfileRepository)
        {
            _tagRepository = tagRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetById(id);
            if (tag != null)
            {
                NotFound();
            }
            return Ok(tag);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            var currentUserProfile = GetCurrentUserProfile();

            // Checking if user who is adding new tag is an Admin, if not unauthorize
            if (currentUserProfile.UserType.Name != "Admin")
            {
                return Unauthorized();
            }
            _tagRepository.Add(tag);
            return CreatedAtAction(nameof(Get), new { id = tag.Id }, tag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserType.Name != "Admin")
            {
                return Unauthorized();
            }

            _tagRepository.Delete(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserType.Name != "Admin")
            {
                return Unauthorized();
            }

            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepository.Update(tag);

            return NoContent();
        }

        // Method to get current user by the firebaseId
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
