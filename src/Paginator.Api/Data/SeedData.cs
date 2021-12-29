using System.Collections.Generic;
using System.Linq;

namespace Paginator.Api.Data
{
    public static class SeedData
    {
        public static void Seed(PaginatorDbContext context)
        {
            foreach (var profileName in new List<string>
            {
                "Quinn",
                "Olivia",
                "Makayla",
                "Vanessa",
                "Andrea",
                "Devon",
                "Patrick",
                "Kisha",
                "Kirk",
                "Chloe",
                "Mia",
                "Renee"
            })
            {
                if (context.Profiles.SingleOrDefault(x => x.Name == profileName) == null)
                {
                    context.Profiles.Add(new Models.Profile
                    {
                        Name = profileName
                    });

                    context.SaveChanges();
                }
            }
        }
    }
}
