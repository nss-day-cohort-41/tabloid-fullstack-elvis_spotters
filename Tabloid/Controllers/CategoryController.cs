using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
        {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
            {
            _categoryRepository = categoryRepository;
            }

        [HttpPost]
        public IActionResult Post(Category category )
            {
            try
                {
                _categoryRepository.AddCategory(category);
                return Ok();
                }
            catch(Exception ex)
                {
                return NotFound();
                }
            }

        }
    }
