//computed once at load of page
var mins = [];
var maxs = [];
const media = document.getElementsByClassName('media');

// gets true offset (independent of parents)
const getOffsetTop = element => {
    let offsetTop = 0;
    while(element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
}

function computeOffs() {
    mins.length = 0;
    maxs.length = 0;
    for (var i = 0; i < media.length; ++i) {
        const offset = getOffsetTop(media[i]);
        mins.push(offset);
        maxs.push(offset - window.innerHeight);
    }
}

//pan image on scroll
const disp_min = 15;
function panImages() {
    const page = window.pageYOffset;
    for (var i = 0; i < media.length; ++i) {
        if (page >= maxs[i]) {
            const displacement = disp_min + 100*(page - mins[i])/(maxs[i] - mins[i]);
            media[i].style.cssText = "object-position: 50%" + displacement.toString() + "%;";
        } else {
            // media below would also be invisible
            break;
        }
    }
}

//computed once at load of page and again on resize
computeOffs();
window.onresize = function(){computeOffs(), panImages()}
//pan on scroll
window.onscroll = function(){panImages()};