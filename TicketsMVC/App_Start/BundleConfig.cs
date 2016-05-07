using System.Web;
using System.Web.Optimization;

namespace TicketsMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-*"));

            bundles.Add(new StyleBundle("~/Content/jquery").Include(
                        "~/Content/themes/base/*.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond*"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
                      "~/Content/bootstrap.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/fancybox").Include(
                      "~/Scripts/fancybox/fancybox.js",
                      "~/Scripts/fancybox/fancybox-*"));

            bundles.Add(new StyleBundle("~/Content/fancybox").Include(
                      "~/Content/fancybox/fancybox.css",
                      "~/Content/fancybox/fancybox-*"));

            bundles.Add(new ScriptBundle("~/bundles/xml2json").Include(
                        "~/Scripts/xml2json/xml2json.js"));

            bundles.Add(new ScriptBundle("~/bundles/map").Include(
                      "~/Scripts/map/gmap3.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/materialize").Include(
                      "~/Scripts/materialize/materialize.js"));

            bundles.Add(new StyleBundle("~/Content/materialize").Include(
                      "~/Content/materialize/materialize.min.css"));

        }
    }

}
