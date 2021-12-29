using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Paginator.Api.Core;
using Paginator.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Paginator.Api.Features
{
    public class GetProfiles
    {
        public class Request: IRequest<Response> { }

        public class Response: ResponseBase
        {
            public List<ProfileDto> Profiles { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IPaginatorDbContext _context;
        
            public Handler(IPaginatorDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    Profiles = await _context.Profiles.Select(x => x.ToDto()).ToListAsync()
                };
            }
            
        }
    }
}
