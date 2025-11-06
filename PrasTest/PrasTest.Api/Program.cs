using Microsoft.EntityFrameworkCore;
using PrasTest.DataAccess;
using PrasTest.Api;
using PrasTest.Api.Extensions;
using PrasTest.Services.Extensions;
using PrasTest.DataAccess.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructure();
builder.Services.AddServices(builder.Configuration);
builder.Services.AddAppAuthentication(builder.Configuration);
builder.Services.AddCors();

var app = builder.Build();

await DbInitializer.SeedAsync(app.Services);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors(builder => {
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
