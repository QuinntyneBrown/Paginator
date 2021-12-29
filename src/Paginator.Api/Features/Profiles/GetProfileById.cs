using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Paginator.Api.Core;
using Paginator.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Paginator.Api.Features
{
    public class GetProfileById
    {
        public class Request: IRequest<Response>
        {
            public Guid ProfileId { get; set; }
        }

        public class Response: ResponseBase
        {
            public ProfileDto Profile { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IPaginatorDbContext _context;
        
            public Handler(IPaginatorDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    Profile = (await _context.Profiles.SingleOrDefaultAsync(x => x.ProfileId == request.ProfileId)).ToDto()
                };
            }
            
        }
    }
}
