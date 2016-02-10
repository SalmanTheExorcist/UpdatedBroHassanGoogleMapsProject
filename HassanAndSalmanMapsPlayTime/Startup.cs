using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HassanAndSalmanMapsPlayTime.Startup))]
namespace HassanAndSalmanMapsPlayTime
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
