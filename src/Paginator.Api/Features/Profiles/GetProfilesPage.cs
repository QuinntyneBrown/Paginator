using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Paginator.Api.Extensions;
using Paginator.Api.Core;
using Paginator.Api.Interfaces;
using Paginator.Api.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Paginator.Api.Features
{
    public class GetProfilesPage
    {
        public class Request: IRequest<Response>
        {
            public int PageSize { get; set; }
            public int Index { get; set; }
        }

        public class Response: ResponseBase
        {
            public int Length { get; set; }
            public List<ProfileDto> Entities { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IPaginatorDbContext _context;
        
            public Handler(IPaginatorDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var query = from profile in _context.Profiles
                    select profile;
                
                var length = await _context.Profiles.CountAsync();
                
                var profiles = await query.Page(request.Index, request.PageSize)
                    .Select(x => x.ToDto()).ToListAsync();
                
                return new()
                {
                    Length = length,
                    Entities = profiles
                };
            }
            
        }
    }
}
