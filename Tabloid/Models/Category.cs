using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
    {
    public class Category
        {

            public int Id { get; set; }
            [Required]
            [StringLength(25, MinimumLength =2)]
            public string Name { get; set; }

        }
    }
