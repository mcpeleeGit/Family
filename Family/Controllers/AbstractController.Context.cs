

using JangBoGo.Info.Object;
using JangBoGo.Info.Object.ObjectHelper;

namespace Family.Controllers
{
    public partial class AbstractController
    {
        [Autowire]
        public ICommonObjectDao COD { set; get; }
    }
}