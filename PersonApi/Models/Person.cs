namespace PersonApi.Models;

public class Person
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public static List<Person> Persons = new()
    {
        new Person { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" },
        new Person { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com" },
        new Person { Id = 3, FirstName = "Bob", LastName = "Johnson", Email = "bob.johnson@example.com" }
    };
}
