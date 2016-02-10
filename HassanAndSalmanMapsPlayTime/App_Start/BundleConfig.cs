using System.Web;
using System.Web.Optimization;

namespace HassanAndSalmanMapsPlayTime
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.flatly.min.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                  //"~/Scripts/angular-file-upload-shim.js",
                  "~/Scripts/angular.js",
                  //"~/Scripts/angular-file-upload.js",
                  "~/Scripts/angular-cookies.js",
                  "~/Scripts/angular-resource.js",
                  "~/Scripts/angular-sanitize.js",
                   "~/Scripts/angular-route.js",
                   "~/app/lib/angularjs-scroll-glue/src/scrollglue.js",
                   //"~/app/lib/angular-signalr-hub/signalr-hub.js",
                   "~/app/lib/angular-smart-table/dist/smart-table.js"));

            bundles.Add(new ScriptBundle("~/bundles/myCustomScripts").Include(
                "~/Scripts/MyCustomScripts/my-global-custom-script.js",
                "~/Scripts/moment-with-locales.js",
                "~/Scripts/datetimepicker.js",
                "~/app/lib/spin.js/spin.js",
                "~/app/lib/angular-bootstrap/ui-bootstrap-tpls.min.js",
                "~/app/lib/ngMap/ng-map.min.js"));
        }
    }
}