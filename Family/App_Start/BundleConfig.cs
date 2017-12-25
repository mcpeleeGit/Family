using System.Web;
using System.Web.Optimization;

namespace Family
{
    public class BundleConfig
    {
        // 번들 작성에 대한 자세한 내용은 http://go.microsoft.com/fwlink/?LinkId=301862 링크를 참조하십시오.
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery.js",
                        "~/Scripts/jquery-ui.js",
                        "~/Scripts/jquery.cookie.js",
                        "~/Scripts/jquery.form.js",
                        "~/Scripts/jquery.scrollTo-1.4.2-min.js",
                        "~/Scripts/jquery.alphanumeric.js",
                        "~/Scripts/stringUtil.js",
                        "~/Scripts/adprint.js",
                        "~/Scripts/jquery.fn.ysrExtension.js",
                        "~/Scripts/jquery.adprint.js",
                        "~/Scripts/date.format.js",
                        "~/Scripts/datePicker.js",
                        "~/Scripts/jquery.validate.js"                       
                        ));
            
            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/CustomAngular/customFilters.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/dev/codeList").Include(
                        "~/Scripts/Dev/codeList.js"));
            bundles.Add(new ScriptBundle("~/bundles/dev/accountList").Include(
                        "~/Scripts/Dev/accountList.js"));
            bundles.Add(new ScriptBundle("~/bundles/dev/accountView").Include(
                        "~/Scripts/Dev/accountView.js"));

            // Modernizr의 개발 버전을 사용하여 개발하고 배우십시오. 그런 다음
            // 프로덕션할 준비가 되면 http://modernizr.com 링크의 빌드 도구를 사용하여 필요한 테스트만 선택하십시오.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/css/bootstrap.css",
                      "~/Content/css/site.css",
                      "~/Content/themes/base/jquery-ui.css"));
        }
    }
}


