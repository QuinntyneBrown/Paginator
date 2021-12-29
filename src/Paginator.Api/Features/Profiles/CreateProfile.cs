using FluentValidation;
using MediatR;
using Paginator.Api.Core;
using Paginator.Api.Interfaces;
using Paginator.Api.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Paginator.Api.Features
{
    public class CreateProfile
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.Profile).NotNull();
                RuleFor(request => request.Profile).SetValidator(new ProfileValidator());
            }

        }

        public class Request : IRequest<Response>
        {
            public ProfileDto Profile { get; set; }
        }

        public class Response : ResponseBase
        {
            public ProfileDto Profile { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IPaginatorDbContext _context;

            public Handler(IPaginatorDbContext context)
                => _context = context;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var profile = new Profile()
                {
                    Name = request.Profile.Name
                };

                _context.Profiles.Add(profile);

                await _context.SaveChangesAsync(cancellationToken);

                return new Response()
                {
                    Profile = profile.ToDto()
                };
            }

        }
    }
}
