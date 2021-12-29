using Paginator.Api.Models;

namespace Paginator.Api.Features
{
    public static class ProfileExtensions
    {
        public static ProfileDto ToDto(this Profile profile)
        {
            return new()
            {
                ProfileId = profile.ProfileId,
                Name = profile.Name
            };
        }

    }
}
