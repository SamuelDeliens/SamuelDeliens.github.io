(function() {
    "use strict"; // Start of use strict    
    
//----------------------------------------------------------------
//                          Initialisation
//----------------------------------------------------------------
    
    //Menu
    window.mainNav = document.querySelector('#mainNav');

    //Switch vue entre 1 et 2
    window.viewCurrent = 1;

    //NavBar
    window.scrollToTop = document.querySelector('#mainNav');
    window.navIsExpendable = false;
    window.navIsReduce = false;

    //Animation
    window.animLanguesDo = false;
    window.nivLangues = [
        document.querySelectorAll('.nivLangues1'),
        document.querySelectorAll('.nivLangues2'),
        document.querySelectorAll('.nivLangues3'),
        document.querySelectorAll('.nivLangues4'),
        document.querySelectorAll('.nivLangues5'),
    ];
    window.animSkillsDo = false;
    window.nivCompetence = document.querySelectorAll('.progress_bar');
    
    
//----------------------------------------------------------------
//                          Script
//----------------------------------------------------------------    
    
    if (scrollToTop) {
        window.addEventListener('scroll', function() {
            window.scrollDistance = window.pageYOffset;
            
            navBarAnimation();
            languageAnimation();
            skillsAnimation();
        })
    }    
    
    menu();
    viewController();
    
})(); //End  of use script

//----------------------------------------------------------------
//                          Functionality
//----------------------------------------------------------------

function menu() {
    if (mainNav) {

        var navbarCollapse = mainNav.querySelector('.navbar-collapse');
        
        if (navbarCollapse) {
          
          var collapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          
          var navbarItems = navbarCollapse.querySelectorAll('a');
          
          // Closes responsive menu when a scroll trigger link is clicked
          for (var item of navbarItems) {
            item.addEventListener('click', function (event) {
              collapse.hide();
            });
          }
        }
    
        // Collapse Navbar
        var collapseNavbar = function() {
    
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    
          if (scrollTop > 100) {
            mainNav.classList.remove("navOff");
          } else {
            mainNav.classList.add("navOff")
          }
        };
        // Collapse now if page is not at top
        collapseNavbar();
        // Collapse the navbar when page is scrolled
        document.addEventListener("scroll", collapseNavbar);
    }
}

function viewController() {
    var buttonView2 = document.querySelectorAll('.buttonView2');
    var buttonView1 = document.querySelectorAll('.buttonView1');
    var view1 = document.querySelectorAll('.view1');
    var view2 = document.querySelectorAll('.view2');
    
    buttonView1.forEach(function(bouttonX) {
        bouttonX.addEventListener('click', function() {
            if (viewCurrent == 2) {
                view2.forEach(function(section) {
                    section.style.display = 'none';
                });
                view1.forEach(function(section) {
                    section.style.display = 'block';
                });
                viewCurrent = 1;
                
                //reinitialisé l'animation langues et compétences
                reinitLangues();
                reinitSkills();
            }  
        })
    });
    buttonView2.forEach(function(bouttonX) {
        bouttonX.addEventListener('click', function() {
            
            
            if (viewCurrent == 1) {
                view1.forEach(function(section) {
                    section.style.display = 'none';
                });
                view2.forEach(function(section) {
                    section.style.display = 'block';
                });
                viewCurrent = 2;
            }                       
        })
    });
}

//----------------------------------------------------------------
//                          Animation
//----------------------------------------------------------------

//NavBar
function navBarAnimation() {
    if (scrollDistance > 500 && navIsExpendable == false) {
        //Descendre
        scrollToTop.animate([
            {
                top:'-100px',
                easing: 'ease-out'
            },
            {
                top: '0px',
            }
        ], 500);
          scrollToTop.style.top = '0px';
          navIsExpendable = true;

        //Remonter  
      } else if (scrollDistance < 300 && navIsExpendable == true && viewCurrent != 2){
        scrollToTop.animate([
            {
                top:'0px',
                easing: 'ease-out'
            },
            {
                top: '-100px',
            }
        ], 500);
          scrollToTop.style.top = '-100px';
          navIsExpendable = false;
      }
    
    //Essaye reduction navBar
    /*
    if (viewCurrent == 2 && scrollDistance > 200 && navIsReduce == false) {
        navIsReduce = true;
        var navBarLogo = document.getElementsByClassName("nav_brand_logo")[0];
        navBarLogo.animate([
            {
                width:'15%',
                easing: 'ease-out'
            },
            {
                width:'10%',
            }
        ], 100);
        navBarLogo.style.width = "10%";
     } else if (viewCurrent == 2 && scrollDistance < 200 && navIsReduce == true) {
        navIsReduce = false;
        var navBarLogo = document.getElementsByClassName("nav_brand_logo")[0];
         navBarLogo.animate([
            {
                width:'10%',
                easing: 'ease-out'
            },
            {
                width:'15%',
            }
        ], 100);
        navBarLogo.style.width = "15%";
     }
     */
}

//Languages
function languageAnimation(){
    if (scrollDistance > 3500 && viewCurrent == 2 && animLanguesDo == false) {
          
        var i=0;
        var j=0;
            
        var animation = function () {setTimeout(function() {
            var animP2 = function (i, j) {setTimeout(function() {
                nivLangues[i][j].style.background = 'var(--bs-secondary)';

                j++;
                if (j <nivLangues[i].length) {
                    animP2(i, j);
                }
            },80);}
            animP2(i,j);
            
            i++;
            if (i < nivLangues.length) {
             animation();
            }
        }, 80);}    
        animation();    
        animLanguesDo = true;
    }  
}
function reinitLangues() {
    nivLangues.forEach(function(listCases) {
        listCases.forEach(function(caseX) {
            caseX.style.background = 'var(--bs-light)';
        });
    });
    animLanguesDo = false;
}

//Skills
function skillsAnimation() {
    if (scrollDistance > 2900 && viewCurrent == 2 && animSkillsDo == false) {
        nivCompetence.forEach(function(competenceX) {
            competenceX.animate([
                {
                    width: "1%",
                    easing: 'ease-in-out'
                },
                {
                    width: competenceX.getAttribute('value')+"%"
                }
            ], 1000);
            competenceX.style.width = competenceX.getAttribute('value')+"%";
        });
        animSkillsDo = true;
    }
}
function reinitSkills() {
    nivCompetence.forEach(function(competenceX) {
        competenceX.style.width = 1+"%";
    });
    animSkillsDo = false;
}