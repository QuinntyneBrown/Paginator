using Paginator.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace Paginator.Api.Interfaces
{
    public interface IPaginatorDbContext
    {
        DbSet<Profile> Profiles { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        
    }
}
