using Paginator.Api.Models;
using Paginator.Api.Core;
using Paginator.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace Paginator.Api.Data
{
    public class PaginatorDbContext: DbContext, IPaginatorDbContext
    {
        public DbSet<Profile> Profiles { get; private set; }
        public PaginatorDbContext(DbContextOptions options)
            :base(options) { }

    }
}
