using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;

public class ChatHub : Hub
{
    // Čuva mapu korisničkih imena i njihovih ConnectionId-ova
    private static Dictionary<string, string> Users = new Dictionary<string, string>();

    // Poziv kada se korisnik poveže na SignalR
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    // Metoda za registraciju korisničkog imena i povezivanje sa ConnectionId
    public Task RegisterUser(string username)
    {
        Users[username] = Context.ConnectionId;
        return Task.CompletedTask;
    }

    // Metoda za slanje privatnih poruka
    public async Task SendPrivateMessage(string fromUser, string toUser, string message)
    {
        if (Users.TryGetValue(toUser, out string connectionId))
        {
            await Clients.Client(connectionId).SendAsync("ReceivePrivateMessage", fromUser, message);
        }
    }
}
