namespace PersonApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // ✅ CORS policy for Angular
        const string CorsPolicyName = "AngularCors";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(CorsPolicyName, policy =>
            {
                policy
                    .WithOrigins("http://localhost:4200") // Angular dev server
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                // لو هتبعت cookies/session لاحقًا:
                // .AllowCredentials();
            });
        });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        //app.UseHttpsRedirection();

        // ✅ Enable CORS (لازم قبل MapControllers)
        app.UseCors(CorsPolicyName);

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
