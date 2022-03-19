<!DOCTYPE html>

<?php //require('assets/sendMail.php'); ?>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Home - Brand</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="text-secondary text-center text-dark" id="page-top" data-bs-spy="scroll" data-bs-target="#mainNav" data-bs-offset="72" style="background: var(--bs-secondary);color: var(--bs-secondary);">
    <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-secondary text-uppercase navOff" id="mainNav" style="color: var(--bs-white);opacity: 1;padding: 1% 0%;top: -100px;">
        <div class="container"><a class="navbar-brand text-start" href="#page-top" style="padding: 0%;padding-left: 3%;width: 35%;margin: 0%;"><img data-bss-hover-animate="rubberBand" class="nav_brand_logo" src="assets/img/header/logo.gif" style="width: 15%;"></a><button data-bs-toggle="collapse" data-bs-target="#navbarResponsive" class="navbar-toggler text-white bg-primary navbar-toggler-right text-uppercase rounded" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto" style="margin-right: 10%;">
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded buttonView1" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded buttonView1" href="#about">à propos</a></li>
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded buttonView1" href="#hobbies">Passions</a></li>
                </ul>
                <ul class="navbar-nav" style="margin-right: 10%;">
                    <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded buttonView2" id="CVbutton" href="#cv">CV</a></li>
                </ul>
            </div>
        </div>
    </nav><!-- Start: Header + Portfolio -->
    <section style="margin: 0px;padding: 0px;background: url(&quot;assets/img/fond/1.svg&quot;), var(--bs-light);background-blend-mode: darken;background-size: 90vw;background-repeat: no-repeat;background-position: top 40% left 60%;">
        <header class="text-center masthead view1" style="padding-top: 7%;padding-bottom: 50px;background: transparent;">
            <div class="container"><img class="img-fluid d-block mx-auto mb-5" id="pp" src="assets/img/header/pp.png" style="min-width: 25%;max-width: 25%;">
                <h1 style="margin-bottom: 5%;font-size: 5vw;line-height: 4vw;">Samuel DELIENS</h1><button class="btn btn-primary btn-sm" type="button" style="padding: 0.4vw 1vw;border-radius: 100px;width: 12vw;font-size: 1.3vw;" data-bs-target="#ContactUs" data-bs-toggle="modal">Contactez moi !</button>
                <hr style="margin-top: 3%;margin-bottom: 5%;max-width: 40vh;min-height: 0.3vw;">
                <h2 class="font-weight-light mb-0" style="font-size: 2vw;line-height: 2vw;">Web Developer - App Developper - Graphic Artist</h2>
            </div>
        </header><!-- Start: #portfolio -->
        <section id="portfolio" class="view1" style="padding: 5% 0px;">
            <h1 class="text-uppercase border-light" style="font-size: 3.6vw;line-height: 3vw;max-width: 25%;margin-right: auto;margin-left: auto;padding-top: 5px;padding-bottom: 5px;color: var(--bs-secondary);">Portfolio</h1>
            <hr style="margin-top: 3%;margin-bottom: 5%;max-width: 40vh;min-height: 0.3vw;">
            <div class="carousel slide carousel-dark" data-bs-ride="carousel" data-bs-interval="7000" id="carousel-1" style="color: var(--bs-light);">
                <div class="carousel-inner">
                    <!-- Start: Shin-it -->
                    <div class="carousel-item active" style="border-style: none;">
                        <div class="container" style="max-width: 80%;">
                            <div class="row" style="background: var(--bs-secondary);border-radius: 15px;border: 5px solid var(--bs-secondary);">
                                <div class="col align-self-center" style="padding-right: 0px;min-width: 50%;"><img src="assets/img/portfolio/shin%27it.svg" alt="Slide Image" style="width: 100%;padding: 15%;"></div>
                                <div class="col align-self-center" style="background: var(--bs-secondary);padding-top: 5%;padding-right: 8%;padding-bottom: 5%;padding-left: 5%;">
                                    <h1 style="font-size: 4vw;">Shin'it</h1>
                                    <hr style="width: 40%;margin-top: 3%;margin-bottom: 10%;">
                                    <p style="margin-top: 5%;margin-bottom: 5%;font-size: 1.5vw;">Cette petite application multiplateforme à pour utilisation d'illuminer un objet par l'utilisation d'un module bluetooth et de led. Sa premiere utilisation fut faite sur un coktail lors d'un concours</p>
                                    <div style="margin: 16.4px 0px -25px;margin-top: 5%;">
                                        <div class="row justify-content-center" style="margin: 1% 12px;">
                                            <div class="col" style="max-width: 20%;"><a href="#portfolio-modal-1" data-bs-toggle="modal"><i class="fa fa-search-plus" data-bss-hover-animate="pulse" style="font-size: 3.3vw;"></i></a></div>
                                            <div class="col" style="max-width: 20%;"><a href="https://github.com/SamuelDeliens/Shin-it.git" target="_blank"><i class="fa fa-external-link" data-bss-hover-animate="pulse" style="font-size: 3.3vw;"></i></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-left: 10%;margin-right: 10%;"></div>
                        </div>
                    </div><!-- End: Shin-it -->
                    <!-- Start: Notepad -->
                    <div class="carousel-item">
                        <div class="container" style="max-width: 80%;">
                            <div class="row" style="background: var(--bs-secondary);border-radius: 20px;border: 5px solid var(--bs-secondary) ;">
                                <div class="col align-self-center" style="padding-right: 0px;min-width: 50%;"><img src="assets/img/portfolio/notepad.svg" alt="Slide Image" style="width: 100%;padding: 15%;"></div>
                                <div class="col align-self-center" style="background: var(--bs-secondary);padding-top: 5%;padding-right: 8%;padding-bottom: 5%;padding-left: 5%;">
                                    <h1 style="font-size: 4vw;">NotePad</h1>
                                    <hr style="width: 40%;margin-top: 3%;margin-bottom: 10%;">
                                    <p style="margin-top: 5%;margin-bottom: 5%;font-size: 1.7vw;">Cette application bureautique permet de gerer des notes que l'on peut organiser à souhait, on on peut y inclure photo, dessin ou graphique</p>
                                    <div style="margin-top: 5%;">
                                        <div class="row justify-content-center">
                                            <div class="col" style="max-width: 20%;"><a href="#portfolio-modal-2" data-bs-toggle="modal"><i class="fa fa-search-plus" data-bss-hover-animate="pulse" style="font-size: 3.3vw;"></i></a></div>
                                            <div class="col" style="max-width: 20%;"><a href="https://github.com/SamuelDeliens/NotesPad.git" target="_blank"><i class="fa fa-external-link" data-bss-hover-animate="pulse" style="font-size: 3.3vw;"></i></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-left: 10%;margin-right: 10%;"></div>
                        </div>
                    </div><!-- End: Notepad -->
                    <!-- Start: Logo -->
                    <div class="carousel-item">
                        <div class="container" style="max-width: 80%;padding: 0px;">
                            <div class="row" style="background: var(--bs-secondary);border: 5px solid var(--bs-secondary);border-radius: 20px;margin: 0px;">
                                <div class="col align-self-center" style="padding-right: 0px;min-width: 50%;"><img src="assets/img/portfolio/logo.gif" alt="Slide Image" style="width: 100%;padding: 15%;border-radius: 50%;border: 0px solid var(--bs-secondary);"></div>
                                <div class="col align-self-center" style="background: var(--bs-secondary);padding-top: 5%;padding-right: 8%;padding-bottom: 5%;padding-left: 5%;">
                                    <h1 style="font-size: 4vw;">Logo</h1>
                                    <hr style="width: 40%;margin-top: 3%;margin-bottom: 10%;">
                                    <p style="margin-top: 5%;margin-bottom: 5%;font-size: 1.6vw;">Chaque application necessite des design plus ou moins recherchés. Aussi je travaille regulierement sur des logo / animation ou idée graphique afin d'agrementer les projets effectués</p>
                                    <div class="row justify-content-center" style="margin: 0px;">
                                        <div class="col" style="max-width: 20%;padding: 0px;"><a href="#portfolio-modal-3" data-bs-toggle="modal"><i class="fa fa-search-plus" data-bss-hover-animate="pulse" style="font-size: 3.3vw;"></i></a></div>
                                        <div class="col" style="max-width: 20%;padding: 0px;"><a href="https://www.instagram.com/deliens.s/" target="_blank"><i class="fa fa-external-link" data-bss-hover-animate="pulse" style="font-size: 3.3vw;"></i></a></div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-left: 10%;margin-right: 10%;"></div>
                        </div>
                    </div><!-- End: Logo -->
                </div>
                <div>
                    <!-- Start: Previous --><a class="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span><span class="visually-hidden">Previous</span></a><!-- End: Previous -->
                    <!-- Start: Next --><a class="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><span class="carousel-control-next-icon"></span><span class="visually-hidden">Next</span></a><!-- End: Next -->
                </div>
                <ol class="carousel-indicators" style="margin: -30px 16%;width: 69.5vw;carousel-indicator-active-bg: black;">
                    <li data-bs-target="#carousel-1" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-target="#carousel-1" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carousel-1" data-bs-slide-to="2"></li>
                </ol>
            </div>
        </section><!-- End: #portfolio -->
    </section><!-- End: Header + Portfolio -->
    <!-- Start: À propos -->
    <section style="margin: 0px;padding: 0px;background: url(&quot;assets/img/fond/2.svg&quot;) no-repeat, var(--bs-light);background-size: 65%;background-position: top left 50%;">
        <section id="about" class="mb-0 view1" style="padding: 5% 0px;background: transparent;">
            <div class="container">
                <h2 class="text-uppercase text-center" style="font-size: 3.6vw;line-height: 3vw;">à propos</h2>
                <hr style="max-width: 40vh;min-height: 0.3vw;margin-top: 3%;margin-bottom: 5%;">
                <div class="row" style="margin: 0px 5%;">
                    <div class="col-6 col-lg-4 ms-auto" style="padding-right: 2%;padding-left: 1%;">
                        <p class="lead" style="font-size: 2.1vh;margin: 0px;max-width: 50vw;">Je m'appelle Deliens Samuel, je suis étudiant à l'INSSET, en 3eme année dans la licence sciences et technologies spécialité systèmes embarqués.&nbsp;</p>
                    </div>
                    <div class="col-6 col-lg-4 me-auto" style="padding-right: 1%;padding-left: 2%;">
                        <p class="lead" style="font-size: 2.1vh;margin: 0px;max-width: 50vw;">Aujourd'hui je sais developper une application web, de bureau et lui donner le design souhaité. Je suis créatif et aime mettre au monde mes idées.</p>
                    </div>
                </div>
            </div>
        </section><!-- Start: #passions -->
        <section id="hobbies" class="view1" style="padding: 5% 0px;background-image: url(&quot;assets/img/fond/3.svg&quot;);background-repeat: no-repeat;background-size: 80%;background-position: top 55% left 50%;">
            <div class="container">
                <h2 class="text-uppercase text-center text-secondary" style="font-size: 3.6vw;line-height: 3vw;">Passions</h2>
                <hr style="max-width: 40vh;min-height: 0.3vw;margin-top: 3%;margin-bottom: 5%;">
                <div class="row justify-content-center">
                    <div class="col-5 col-sm-6 col-md-6 col-lg-4" style="margin: 2% 0%;"><img class="img-fluid" data-bss-hover-animate="pulse" src="assets/img/hobbies/code.svg" style="border-radius: 15px;border: 0px solid var(--bs-light) ;"></div>
                    <div class="col-5 col-sm-6 col-md-6 col-lg-4" style="margin: 2% 0%;"><img class="img-fluid" data-bss-hover-animate="pulse" src="assets/img/hobbies/design.svg" style="border: 0px solid var(--bs-light);border-radius: 15px;"></div>
                    <div class="col-5 col-sm-6 col-md-6 col-lg-4" style="margin: 2% 0%;"><img class="img-fluid" data-bss-hover-animate="pulse" src="assets/img/hobbies/montagne.svg" style="border: 0px solid var(--bs-light);border-radius: 15px;"></div>
                    <div class="col-5 col-sm-6 col-md-6 col-lg-4" style="margin: 2% 0%;"><img class="img-fluid" data-bss-hover-animate="pulse" src="assets/img/hobbies/photo.svg" style="border: 0px solid var(--bs-light);border-radius: 15px;"></div>
                    <div class="col-5 col-sm-6 col-md-6 col-lg-4" style="margin: 2% 0%;"><img class="img-fluid" data-bss-hover-animate="pulse" src="assets/img/hobbies/game.svg" style="border: 0px solid var(--bs-light);border-radius: 15px;"></div>
                    <div class="col-5 col-sm-6 col-md-6 col-lg-4" style="margin: 2% 0%;"><img class="img-fluid" data-bss-hover-animate="pulse" src="assets/img/hobbies/musique.svg" style="border: 0px solid var(--bs-light);border-radius: 15px;"></div>
                </div>
            </div>
        </section><!-- End: #passions -->
    </section><!-- End: À propos -->
    <!-- Start: #CV -->
    <section id="cv" class="view2" style="padding-bottom: 3%;background: var(--bs-light);padding-top: 20vh;">
        <!-- Start: HeaderCV -->
        <div class="container">
            <h2 class="text-uppercase text-center text-secondary mb-0" style="font-size: 4.6vw;line-height: 3vw;">CV</h2>
            <hr style="max-width: 40vh;margin-bottom: 3%;min-height: 0.3vw;margin-top: 5%;">
        </div><!-- End: HeaderCV --><a class="btn btn-primary" role="button" style="margin-top: 2%;margin-bottom: 3%;font-size: 1.5vw;" href="assets/img/CV.png" target="_blank">telecharger CV</a>
        <div class="container">
            <div class="row justify-content-center align-items-center" style="margin: 0px;">
                <div class="col-lg-10 text-start mx-auto">
                    <!-- Start: Informations personnelles -->
                    <section style="padding: 0px;margin: 0px;margin-top: 5%;">
                        <div class="row" style="margin: 0px;">
                            <div class="col" style="padding: 0px;">
                                <h1 class="text-start" style="font-size: 3vw;">Informations personnelles</h1>
                                <div class="row" style="margin-top: 3%;margin-bottom: 3%;margin-left: 0px;margin-right: 0px;">
                                    <div class="col-4">
                                        <picture><img src="assets/img/header/pp.png" style="max-width: 70%;margin: 2% 1%;"></picture>
                                    </div>
                                    <div class="col-8 align-self-center">
                                        <p style="font-size: 1.5vw;text-align: left;">Étudiant en troisième année de licence Sciences et Technologies, spécialité orienté objet. Dynamique, assidu et conbattif, aime apprendre au contact de professionnels dans un environnement passionnant.</p>
                                    </div>
                                </div>
                                <div class="row" style="margin: 0px;">
                                    <div class="col-5" style="padding: 0px;">
                                        <div class="row" style="margin: 5% 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;">
                                            <div class="col align-self-center" style="padding: 0px;color: var(--bs-light);background: var(--bs-secondary);max-width: 35%;">
                                                <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Nom</h1>
                                            </div>
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;">Deliens</h1>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;">
                                            <div class="col align-self-center" style="padding-right: 0px;padding-left: 0%;color: var(--bs-light);background: var(--bs-secondary);max-width: 35%;">
                                                <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Prenom</h1>
                                            </div>
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;">Samuel</h1>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;">
                                            <div class="col align-self-center" style="padding-right: 0px;padding-left: 0%;color: var(--bs-light);background: var(--bs-secondary);max-width: 35%;">
                                                <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Date</h1>
                                            </div>
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;">13/12/2001</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div></div>
                                    </div>
                                    <div class="col-5 align-self-center" style="padding: 0px;">
                                        <div class="row" style="margin: 5% 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;">
                                            <div class="col align-self-center" style="max-width: 35%;padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);">
                                                <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Mail</h1>
                                            </div>
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <h1 style="font-size: 1vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;">Samuel.deliens@gmail.com</h1>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;">
                                            <div class="col align-self-center" style="max-width: 35%;padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);">
                                                <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;"><strong>Adresse</strong></h1>
                                            </div>
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <h1 style="font-size: 1.2vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;"><strong>02100, St Quentin</strong></h1>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;">
                                            <div class="col align-self-center" style="max-width: 35%;padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);">
                                                <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Rue</h1>
                                            </div>
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <h1 style="font-size: 1.2vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;">5rue des freres Desains</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section><!-- End: Informations personnelles -->
                    <hr style="width: 240px;margin-top: 8%;margin-bottom: 7%;max-width: 40vh;min-height: 0.3vw;"><!-- Start: Experiences2 -->
                    <section id="experience" style="margin: 0px;padding: 0px;">
                        <!-- Start: container -->
                        <div class="container">
                            <!-- Start: divider white -->
                            <div class="divider text-white"></div><!-- End: divider white -->
                            <!-- Start: heading -->
                            <div class="alert-heading">
                                <h2>Expériences Professionnelles</h2>
                            </div><!-- End: heading -->
                            <!-- Start: timeline -->
                            <ul class="timeline list-unstyled" style="margin-top: 5%;">
                                <li>
                                    <div class="timeline-badge">
                                        <!-- Start: bi-briefcase-fill --><span class="fa fa-briefcase"></span><!-- End: bi-briefcase-fill -->
                                    </div>
                                    <div class="timeline-panel-container" style="color: var(--bs-body-bg);">
                                        <!-- Start: timeline-panel -->
                                        <div class="timeline-panel" style="background: var(--bs-secondary);border: 1px solid rgb(24, 42, 60);box-shadow: 4px 3px 10px 0px rgba(24,42,60,0.5);">
                                            <!-- Start: timeline-heading -->
                                            <div class="timeline-heading" style="padding-bottom: 4%;">
                                                <h3 style="margin-top: 2.5%;font-size: 1.7vw;font-weight: bold;">Noolitic</h3>
                                                <h4 style="color: var(--bs-primary);font-size: 2vw;margin-bottom: 3%;">Développement Web et embarqué</h4>
                                                <p class="text-muted" style="padding: 0%;margin: 0%;"><span class="fa fa-location-arrow" style="margin-right: 0%;font-size: 1vw;font-style: italic;">&nbsp;Euratechnologies - Lille<span class="fa fa-clock" style="font-size: 1vw;margin-right: 10%;margin-top: 2%;font-style: italic;">&nbsp;01/2021 - 1 mois</span></span></p>
                                            </div><!-- End: timeline-heading -->
                                            <!-- Start: timeline-body -->
                                            <div class="timeline-body">
                                                <p style="font-size: 1.3vw;line-height: 1.8vw;text-align: left;border-color: var(--bs-body-bg);letter-spacing: -0.2px;margin-bottom: 4%;">Création d'une application pour contrôler un objet connecté à distance en utilisant l'API Flutter</p>
                                                <p style="font-size: 1.3vw;line-height: 1.8vw;text-align: left;border-color: var(--bs-body-bg);letter-spacing: -0.2px;margin-bottom: 4%;">Reflexion entre les contraintes de l'objet et les demandes des clients</p>
                                            </div><!-- End: timeline-body -->
                                        </div><!-- End: timeline-panel -->
                                    </div>
                                    <div class="timeline-panel-container-inverted">
                                        <h4 class="timeline-panel-container-inverted-right" style="font-size: 2vw;">2021</h4>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-badge">
                                        <!-- Start: bi-briefcase-fill --><span class="fa fa-briefcase"></span><!-- End: bi-briefcase-fill -->
                                    </div>
                                    <div class="timeline-panel-container-inverted" style="color: var(--bs-body-bg);">
                                        <!-- Start: timeline-panel -->
                                        <div class="timeline-panel" style="background: var(--bs-secondary);border: 1px solid rgb(24, 42, 60);box-shadow: 4px 3px 10px 0px rgba(24,42,60,0.5);">
                                            <!-- Start: timeline-heading -->
                                            <div class="timeline-heading" style="padding-bottom: 4%;">
                                                <h3 style="margin-top: 2.5%;font-size: 1.7vw;font-weight: bold;">PAJ</h3>
                                                <h4 style="color: var(--bs-primary);font-size: 2vw;margin-bottom: 3%;">Bénévolat</h4>
                                                <p class="text-muted" style="padding: 0%;margin: 0%;"><span class="fa fa-location-arrow" style="margin-right: 0%;font-size: 1vw;font-style: italic;">&nbsp;Barentin<span class="fa fa-clock" style="font-size: 1vw;margin-right: 10%;margin-top: 2%;font-style: italic;">&nbsp;2019 - 1 an</span></span></p>
                                            </div><!-- End: timeline-heading -->
                                            <!-- Start: timeline-body -->
                                            <div class="timeline-body">
                                                <p style="font-size: 1.3vw;line-height: 1.8vw;text-align: left;border-color: var(--bs-body-bg);letter-spacing: -0.2px;margin-bottom: 4%;">Création d'arts divers (peinture sur pot, toile) pour une exposition</p>
                                                <p style="font-size: 1.3vw;line-height: 1.8vw;text-align: left;border-color: var(--bs-body-bg);letter-spacing: -0.2px;margin-bottom: 4%;">Renovation de la partie extérieure de la base nautique de Jumiège</p>
                                            </div><!-- End: timeline-body -->
                                        </div><!-- End: timeline-panel -->
                                    </div>
                                    <div class="timeline-panel-container">
                                        <h4 class="text-end timeline-panel-container-left" style="font-size: 2vw;">2019</h4>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-badge">
                                        <!-- Start: bi-briefcase-fill --><span class="fa fa-briefcase"></span><!-- End: bi-briefcase-fill -->
                                    </div>
                                    <div class="timeline-panel-container" style="color: var(--bs-body-bg);">
                                        <!-- Start: timeline-panel -->
                                        <div class="timeline-panel" style="background: var(--bs-secondary);border: 1px solid rgb(24, 42, 60);box-shadow: 4px 3px 10px 0px rgba(24,42,60,0.5);">
                                            <!-- Start: timeline-heading -->
                                            <div class="timeline-heading" style="padding-bottom: 4%;">
                                                <h3 style="margin-top: 2.5%;font-size: 1.7vw;font-weight: bold;">Multisys</h3>
                                                <h4 style="color: var(--bs-primary);font-size: 2vw;margin-bottom: 3%;">Maintenance objets électroniques</h4>
                                                <p class="text-muted" style="padding: 0%;margin: 0%;"><span class="fa fa-location-arrow" style="margin-right: 0%;font-size: 1vw;font-style: italic;">&nbsp;Barentin<span class="fa fa-clock" style="font-size: 1vw;margin-right: 10%;margin-top: 2%;font-style: italic;">&nbsp;11/2016 - 1 semaine</span></span></p>
                                            </div><!-- End: timeline-heading -->
                                            <!-- Start: timeline-body -->
                                            <div class="timeline-body">
                                                <p style="font-size: 1.3vw;line-height: 1.8vw;text-align: left;border-color: var(--bs-body-bg);letter-spacing: -0.2px;margin-bottom: 4%;">Aménagement réseau et réseau électrique dans un bâtiment public</p>
                                                <p style="font-size: 1.3vw;line-height: 1.8vw;text-align: left;border-color: var(--bs-body-bg);letter-spacing: -0.2px;margin-bottom: 4%;">Réparation d'appareils électroniques divers (ordinateur, téléphones)</p>
                                            </div><!-- End: timeline-body -->
                                        </div><!-- End: timeline-panel -->
                                    </div>
                                    <div class="timeline-panel-container-inverted">
                                        <h4 class="timeline-panel-container-inverted-right" style="font-size: 2vw;">2016</h4>
                                    </div>
                                </li>
                            </ul><!-- End: timeline -->
                        </div><!-- End: container -->
                    </section><!-- End: Experiences2 -->
                    <hr style="width: 240px;margin-top: 8%;margin-bottom: 7%;max-width: 40vh;min-height: 0.3vw;"><!-- Start: Formations -->
                    <section style="margin: 0px;padding: 0px;">
                        <div class="row" style="margin: 0px;">
                            <div class="col" style="padding: 0%;">
                                <h1 style="font-size: 3vw;">Formations</h1>
                                <div class="row" style="margin: 3% 0px;">
                                    <div class="col">
                                        <div class="text-center" data-bss-hover-animate="pulse" style="border-radius: 5px;box-shadow: 5px 5px 6px rgba(222,222,222,0.7), -3px -1px 7px 2px rgba(220,220,220,0.3);border: 1px solid var(--bs-gray-300);border-top-width: 0px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 0px;padding: 3%;">
                                            <h5 class="text-center" style="box-shadow: 0px 0px;font-size: 2vw;margin-top: 1%;margin-bottom: 0%;">2022</h5><i class="fas fa-award" style="font-size: 3vw;margin: 3% 0%;color: var(--bs-gray-600);"></i>
                                            <h3 style="color: var(--bs-teal);font-size: 2.5vw;">INSSET - St-Quentin</h3>
                                            <h4 style="font-size: 2vw;">Système embarqué</h4>
                                            <hr style="width: 40%;height: 2px;color: var(--bs-gray-600);">
                                            <p style="font-size: 1.5vw;margin: 0px;">Électronique embarqué</p>
                                            <p class=".container1" style="font-size: 1.5vw;"><a class="inssetPopover" data-toggle="popover" data-placement="Top" data-html="true" data-popover-content="#inssetPopoverContent" data-trigger="click" data-container="body" data-title="Autres formations" data-offset="0, 10"><i class="fa fa-plus" style="color: var(--bs-secondary);font-size: 1.7vw;"></i></a></p>
                                        </div>
                                    </div><!-- Start: separation -->
                                    <div class="col-1">
                                        <div></div>
                                    </div><!-- End: separation -->
                                    <div class="col">
                                        <div class="text-center" data-bss-hover-animate="pulse" style="border-radius: 5px;box-shadow: 5px 5px 6px rgba(222,222,222,0.7), -3px -1px 7px 2px rgba(220,220,220,0.3);border: 1px solid var(--bs-gray-300);border-top-width: 0px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 0px;padding: 3%;">
                                            <h5 class="text-center" style="box-shadow: 0px 0px;font-size: 2vw;margin-top: 1%;margin-bottom: 0%;">2019</h5><i class="fas fa-award" style="font-size: 3vw;margin: 3% 0%;color: var(--bs-gray-600);"></i>
                                            <h3 style="color: var(--bs-teal);font-size: 2.5vw;">Jean XXIII - Yvetôt</h3>
                                            <h4 style="font-size: 2vw;">Baccalauréat</h4>
                                            <hr style="width: 40%;height: 2px;color: var(--bs-gray-600);">
                                            <p style="margin: 0px;font-size: 1.5vw;">Terminal S- spécialité SVT</p>
                                            <p style="font-size: 1.5vw;">Mention Bien</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section><!-- End: Formations -->
                    <hr style="width: 240px;margin-top: 7%;margin-bottom: 7%;max-width: 40vh;min-height: 0.3vw;"><!-- Start: Compétences -->
                    <section style="padding: 0px;margin: 0px;">
                        <div class="row" style="margin: 0px;">
                            <div class="col" style="padding: 0px;">
                                <h1 style="font-size: 3vw;">Compétences</h1>
                                <div class="row">
                                    <div class="col-5">
                                        <div class="row" style="padding: 3% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin-top: 3%;margin-right: 0%;margin-left: 0%;margin-bottom: 5%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>HTML / CSS / Bootstrap</strong></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="26">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>HTML / CSS / Bootstrap</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin: 5% 0%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;">Javascript / Node</h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="22">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Javascript / Node</strong></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin: 5% 0%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;">Base de données</h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="18">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Base de données</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin: 5% 0%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;">PHP</h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="15">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>PHP</strong></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin-top: 10%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Développement&nbsp;sur carte</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="22">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Développement&nbsp;sur carte</strong></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Développement Java</strong></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="20">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;">Développement Java</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Développement&nbsp;Mobile</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="15">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Développement&nbsp;Mobile</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin-top: 10%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Modélisation UML</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="18">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Modélisation UML</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Modélisation MVC</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="11">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Modélisation MVC</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div></div>
                                    </div>
                                    <div class="col-5">
                                        <div class="row" style="padding: 3% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin-top: 3%;margin-right: 0%;margin-left: 0%;margin-bottom: 5%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Pack Office</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="27">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Pack Office</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Google WorkSpace</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="25">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Google WorkSpace</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Outils Developpement</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="21">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Outils Developpement</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;">Versionnage (Git)</h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="17">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Versionnage (Git)</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin-top: 10%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>MatLab</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="19">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>MatLab</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Proteus / EasyEDA</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="17">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Proteus / EasyEDA</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Suite Adobe &amp; Outils Graphiques</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="11">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Suite Adobe &amp; Outils Graphiques</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;margin-top: 10%;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Etude circuits électroniques&nbsp;</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="19">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Etude circuits électroniques&nbsp;&nbsp;FlutterGrande OrganisationEtude circuits électroniques&nbsp;</strong></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0%;padding: 3.5% 0%;border-radius: 5px;border-width: 2px;border-style: none;">
                                            <div class="col align-self-center" style="padding: 0px;">
                                                <div style="height: 2.3vw;width: 30%;position: absolute;border-radius: 0.4vw;border: 0.3vw solid var(--bs-secondary);">
                                                    <h1 style="font-size: 1.5vw;margin-left: 10px;"><strong>Conception 3D</strong><br></h1>
                                                </div>
                                                <div class="progress_bar" style="height: 2.3vw;width: 1%;position: absolute;background: var(--bs-secondary);border-radius: 0.4vw;overflow: hidden;border-width: 0.3vw;border-top-style: solid;border-top-color: var(--bs-secondary);border-bottom-style: solid;border-bottom-color: var(--bs-secondary);border-left-style: solid;border-left-color: var(--bs-secondary);" value="16">
                                                    <h1 class="text-nowrap" style="font-size: 1.5vw;color: var(--bs-body-bg);margin-left: 10px;"><strong>Conception 3D</strong><br></h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section><!-- End: Compétences -->
                    <hr style="width: 240px;margin-top: 7%;margin-bottom: 7%;max-width: 40vh;min-height: 0.3vw;"><!-- Start: Formations -->
                    <section style="margin: 0px;padding: 0px;">
                        <div class="row" style="margin: 0px;">
                            <div class="col" style="padding: 0%;">
                                <h1 style="font-size: 3vw;">Qualités</h1>
                                <div class="row" style="margin: 4% 0px;">
                                    <div class="col text-center" style="height: 17vw;">
                                        <div class="row justify-content-center">
                                            <div class="col" style="padding: 0px;max-width: 100px;">
                                                <div class="position-absolute" style="margin-left: -8vw;margin-top: 5vw;border-radius: 2.2vw;box-shadow: 0.4vw 0.6vw 10px 3px var(--bs-gray-200);padding: 2.5vw 0px;padding-bottom: 1.5vw;border-top-right-radius: 2.5vw;width: 23vw;border-top-left-radius: 2.5vw;border-width: 0.25vw;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;">
                                                    <h5 style="font-size: 2.1vw;">Travail en équipe</h5>
                                                    <p style="margin: 0px;color: var(--bs-gray-500);padding: 0px 10px;font-weight: bold;font-size: 1.3vw;"><strong>J'aime travailler en équipe pour la réussite d'un projet.</strong><br></p>
                                                </div>
                                                <div data-bss-hover-animate="swing" class="position-absolute" style="border-radius: 10vw;background: var(--bs-light);box-shadow: 0px -0.1vw 0px;width: 7vw;height: 7vw;border-width: 0.2vw;border-style: solid;border-top-width: 0.2vw;border-right-width: 0.1vw;border-bottom-width: 0px;border-left-width: 0.1vw;"><i class="fa fa-group" style="font-size: 3.5vw;margin-top: 1.8vw;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col text-center" style="height: 17vw;margin: 0px 4vw;">
                                        <div class="row justify-content-center">
                                            <div class="col" style="padding: 0px;max-width: 100px;">
                                                <div class="position-absolute" style="margin-left: -8vw;margin-top: 5vw;border-radius: 2.2vw;box-shadow: 0.4vw 0.6vw 10px 3px var(--bs-gray-200);padding: 2.5vw 0px;padding-bottom: 1.5vw;border-top-right-radius: 2.5vw;width: 23vw;border-top-left-radius: 2.5vw;border-width: 0.25vw;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;">
                                                    <h5 style="font-size: 2.1vw;">Organisé</h5>
                                                    <p style="margin: 0px;color: var(--bs-gray-500);padding: 0px 10px;font-weight: bold;font-size: 1.3vw;"><strong>J'organise toujours mon travail afin d'amélioré ma productivité.</strong></p>
                                                </div>
                                                <div data-bss-hover-animate="swing" class="position-absolute" style="border-radius: 10vw;background: var(--bs-light);box-shadow: 0px -0.1vw 0px;width: 7vw;height: 7vw;border-width: 0.2vw;border-style: solid;border-top-width: 0.2vw;border-right-width: 0.1vw;border-bottom-width: 0px;border-left-width: 0.1vw;"><i class="fa fa-folder" style="font-size: 3.5vw;margin-top: 1.8vw;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col text-center" style="height: 17vw;">
                                        <div class="row justify-content-center">
                                            <div class="col" style="padding: 0px;max-width: 100px;">
                                                <div class="position-absolute" style="margin-left: -8vw;margin-top: 5vw;border-radius: 2.2vw;box-shadow: 0.4vw 0.6vw 10px 3px var(--bs-gray-200);padding: 2.5vw 0px;padding-bottom: 1.5vw;border-top-right-radius: 2.5vw;width: 23vw;border-top-left-radius: 2.5vw;border-width: 0.25vw;border-style: solid;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;">
                                                    <h5 style="font-size: 2.1vw;">Investi</h5>
                                                    <p style="margin: 0px;color: var(--bs-gray-500);padding: 0px 10px;font-weight: bold;font-size: 1.3vw;"><strong>Je m'investi beaucoup dans les projets qui me tiennent à coeur !</strong></p>
                                                </div>
                                                <div data-bss-hover-animate="swing" class="position-absolute" style="border-radius: 10vw;background: var(--bs-light);box-shadow: 0px -0.1vw 0px;width: 7vw;height: 7vw;border-width: 0.2vw;border-style: solid;border-top-width: 0.2vw;border-right-width: 0.1vw;border-bottom-width: 0px;border-left-width: 0.1vw;"><i class="fa fa-clock-o" style="font-size: 3.5vw;margin-top: 1.8vw;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section><!-- End: Formations -->
                    <hr style="width: 240px;margin-top: 7%;margin-bottom: 7%;max-width: 40vh;min-height: 0.3vw;"><!-- Start: Diplomes & Languages -->
                    <section style="margin: 0px;padding: 0px;">
                        <div class="row" style="margin: 0px;">
                            <!-- Start: Diplomes -->
                            <div class="col-5" style="padding: 0px;">
                                <h1 class="text-start" style="font-size: 3vw;">Diplomes</h1>
                                <div class="row" style="margin: 5% 0px;">
                                    <div class="col" style="padding: 0px;">
                                        <div class="row" style="margin: 5% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;height: 100%;">
                                                    <div class="col align-self-center" style="max-width: 35%;padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);">
                                                        <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;"><strong>2019</strong></h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;"><strong>Bac S- SVT</strong></h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;height: 100%;">
                                                    <div class="col align-self-center" style="max-width: 35%;padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);">
                                                        <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">2019</h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;">Permis B</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 5% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;border-width: 2px;border-style: solid;height: 100%;">
                                                    <div class="col align-self-center" style="max-width: 35%;padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);">
                                                        <h1 style="font-size: 1.8vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">2016</h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;"><strong>2nd cycle piano</strong></h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- End: Diplomes -->
                            <!-- Start: Nothing -->
                            <div class="col-2">
                                <div></div>
                            </div><!-- End: Nothing -->
                            <!-- Start: Languages -->
                            <div class="col-5" style="padding: 0px;">
                                <h1 class="text-start" style="font-size: 3vw;">Languages</h1>
                                <div class="row" style="margin: 5% 0px;">
                                    <div class="col" style="padding: 0px;">
                                        <div class="row" style="margin: 3% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;height: 100%;border-width: 2px;border-color: var(--bs-secondary);">
                                                    <div class="col align-self-center" style="padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);border-radius: 5px;border-style: solid;border-color: var(--bs-secondary);border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;min-width: 30%;max-width: 30%;">
                                                        <h1 style="font-size: 1.5vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Francais</h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues1" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues2" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues3" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues4" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues5" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border: 2px solid transparent;background: var(--bs-secondary);min-height: 100%;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;margin-top: 2%;color: var(--bs-light);">C2</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 3% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;height: 100%;border-width: 2px;border-color: var(--bs-secondary);">
                                                    <div class="col align-self-center" style="padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);border-radius: 5px;border-style: solid;border-color: var(--bs-secondary);border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;min-width: 30%;max-width: 30%;">
                                                        <h1 style="font-size: 1.5vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Anglais</h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues1" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues2" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues3" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border: 2px solid transparent;background: var(--bs-secondary);min-height: 100%;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;margin-top: 2%;color: var(--bs-light);">B2</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 3% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;height: 100%;border-width: 2px;border-color: var(--bs-secondary);">
                                                    <div class="col align-self-center" style="padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);border-radius: 5px;border-style: solid;border-color: var(--bs-secondary);border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;min-width: 30%;max-width: 30%;">
                                                        <h1 style="font-size: 1.5vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Espagnol</h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues1" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues2" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border: 2px solid transparent;background: var(--bs-secondary);min-height: 100%;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;margin-top: 2%;color: var(--bs-light);">B1</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin: 3% 0px;">
                                            <div class="col" style="padding-right: 1%;padding-left: 1%;">
                                                <div class="row" style="margin: 0%;padding: 0%;border-radius: 5px;height: 100%;border-width: 2px;border-color: var(--bs-secondary);">
                                                    <div class="col align-self-center" style="padding-right: 0px;padding-left: 0%;min-height: 100%;color: var(--bs-light);background: var(--bs-secondary);border-radius: 5px;border-style: solid;border-color: var(--bs-secondary);border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;min-width: 30%;max-width: 30%;">
                                                        <h1 style="font-size: 1.5vw;text-align: center;margin-top: 2%;margin-bottom: 0px;">Chinois</h1>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div class="nivLangues nivLangues1" style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;max-width: 10%;text-align: center;">
                                                        <div style="background: var(--bs-light);min-height: 2vw;max-width: 2vw;border-radius: 35%;margin-left: auto;margin-right: auto;margin-top: 5%;margin-bottom: 5%;border: 0.25vw solid var(--bs-secondary) ;"></div>
                                                    </div>
                                                    <div class="col align-self-center" style="padding: 0px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border: 2px solid transparent;background: var(--bs-secondary);min-height: 100%;">
                                                        <h1 style="font-size: 1.5vw;min-width: 100%;margin-bottom: 0px;margin-left: 5%;margin-top: 2%;color: var(--bs-light);">A2</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- End: Languages -->
                        </div>
                    </section><!-- End: Diplomes & Languages -->
                </div>
            </div>
        </div>
        <section></section>
    </section><!-- End: #CV -->
    <footer class="text-center footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4" style="font-size: 1.8vw;padding: 3% 0px;">adresse</h4>
                    <p style="font-size: 1.3vw;">05 rue des Freres Desains<br>St Quentin, 02100</p>
                </div>
                <div class="col-md-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase" style="font-size: 1.8vw;padding: 3% 0px;">Autour du web</h4>
                    <ul class="list-inline">
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" href="mailto:samuel.deliens@gmail.com"><i class="fab fa-google-plus-g fa-fw"></i></a></li>
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" href="https://github.com/SamuelDeliens"><i class="fab fa-github fa-fw"></i></a></li>
                        <li class="list-inline-item"><a class="btn btn-outline-light text-center btn-social rounded-circle" role="button" href="https://www.instagram.com/deliens.s/"><i class="fab fa-instagram fa-fw"></i></a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h4 class="text-uppercase mb-4" style="font-size: 1.8vw;padding: 3% 0px;">Navigation</h4>
                    <div class="row justify-content-center">
                        <div class="col align-self-center" style="max-width: 50%;">
                            <ul class="text-start" style="max-width: 70%;margin-left: 20%;">
                                <li style="font-size: 1.3vw;"><a class="buttonView1" href="#page-top" style="color: var(--bs-light); text-decoration:none;">Header</a></li>
                                <li style="font-size: 1.3vw;"><a class="buttonView1" href="#portfolio" style="color: var(--bs-light); text-decoration:none;">Portfolio</a></li>
                                <li style="font-size: 1.3vw;"><a class="buttonView1" href="#about" style="color: var(--bs-light); text-decoration:none;">About</a></li>
                                <li style="font-size: 1.3vw;"><a class="buttonView1" href="#hobbies" style="color: var(--bs-light); text-decoration:none;">Hobbies</a></li>
                                <li style="font-size: 1.3vw;"><a class="buttonView2" href="#cv" style="color: var(--bs-light); text-decoration:none;">CV</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="text-center text-white copyright py-4">
        <div class="container"><small>Copyright ©&nbsp;Deliens.S 2021</small></div><a class="text-center d-block rounded text-white" href="#page-top"><i class="fa fa-chevron-up"></i></a>
    </div>
    <div class="modal text-center viewM" role="dialog" tabindex="-1" id="portfolio-modal-1">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                <div class="modal-body">
                    <div class="container text-center">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <h2 class="text-uppercase text-secondary mb-0" style="font-size: 4vw;">Shin'IT</h2>
                                <hr style="height: 0.3vw;margin-top: 5%;margin-bottom: 10%;width: 30vw;"><img class="img-fluid mb-5" src="assets/img/portfolio/shin%27it.svg" style="max-width: 80%;border-width: 5px;border-style: solid;border-radius: 50%;">
                                <p class="mb-5" style="font-size: 2vw;">Developpé en Flutter, elle permet aussi d'etre utilisée sur divers plateforme (windows, osX, android, IOS). En choisissant le module bluetooth adequat lors de l'utilisation de l'application, l'on peut alors effectué l'allumage des led reliés au module. On peut donc se servir de cette application afin d'illuminer ce que l'on souhaite. Sa premiere utilisation fut faite afin d'illuminer un coktail lors de son arrivé sur la table du client, le tous lors du concours Arcoroc en 2021.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pb-5"><a class="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss" role="button" data-bs-dismiss="modal" style="margin: auto;margin-right: 5%;font-size: 2vw;"><i class="fa fa-close" style="font-size: 2vw;"></i>&nbsp;Close Project</a><a class="btn btn-primary btn-lg" role="button" style="border-radius: 800px;font-size: 2vw;margin: auto;margin-left: 5%;" target="_blank" href="https://github.com/SamuelDeliens/Shin-it.git">&nbsp;<i class="fa fa-link"></i>&nbsp;Open Code</a></div>
            </div>
        </div>
    </div>
    <div class="modal text-center viewM" role="dialog" tabindex="-1" id="portfolio-modal-2">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                <div class="modal-body">
                    <div class="container text-center">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <h2 class="text-uppercase text-secondary mb-0" style="font-size: 4vw;">NotePad</h2>
                                <hr style="height: 0.3vw;margin-top: 40px;margin-bottom: 48px;width: 30vw;"><img class="img-fluid mb-5" src="assets/img/portfolio/notepad.svg" style="max-width: 80%;border-width: 5px;border-style: solid;border-radius: 50%;">
                                <p class="mb-5" style="font-size: 2vh;">Développé en Java,&nbsp; cette application permet de gerer l'edition et l'organisation de notes, chacunes d'entre elles peuvent ainsi contenir différents objets. Evidement des objets textes que l'on peut organiser, editer et customiser au choix, mais aussi des objets photos, graphiques ou dessin. L'ensemble des ces elements sont des blocs agencable au choix les uns les autres sous forme de widget. Enfin ces notes peuvent etre triés dans des dossiers que l'on peut aussi créer et editer au choix.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pb-5"><a class="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss" role="button" data-bs-dismiss="modal" style="margin: auto;margin-right: 5%;font-size: 2vw;"><i class="fa fa-close" style="font-size: 2vw;"></i>&nbsp;Close Project</a><a class="btn btn-primary btn-lg" role="button" style="border-radius: 800px;font-size: 2vw;margin: auto;margin-left: 5%;" target="_blank" href="https://github.com/SamuelDeliens/NotesPad.git">&nbsp;<i class="fa fa-link"></i>&nbsp;Open Code</a></div>
            </div>
        </div>
    </div>
    <div class="modal text-center viewM" role="dialog" tabindex="-1" id="portfolio-modal-3">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                <div class="modal-body">
                    <div class="container text-center">
                        <div class="row" style="margin: 0px;">
                            <div class="col-lg-8 mx-auto" style="margin: 0px;padding: 0px;">
                                <h2 class="text-uppercase text-secondary mb-0">Design Creation</h2>
                                <hr style="width: 30vw;height: 0.3vw;margin-top: 40px;margin-bottom: 48px;">
                                <p class="mb-5" style="font-size: 2vh;">Voici quelques créations design que j'ai pu effectués:</p>
                                <div class="row">
                                    <div class="col-6" style="padding: 0px;"><iframe src="https://www.instagram.com/p/CUAu-c4sSxZ/embed" allowtransparency="true" frameborder="0" scrolling="no" width="200" height="300" style="width: 17vw;height: 43vh;"></iframe></div>
                                    <div class="col-6" style="padding: 0px;"><iframe src="https://www.instagram.com/p/CUAu0dlMB6v/embed" allowtransparency="true" frameborder="0" scrolling="no" width="200" height="300" style="width: 17vw;height: 43vh;"></iframe></div>
                                </div>
                                <div class="row">
                                    <div class="col-6" style="padding: 0px;"><iframe src="https://www.instagram.com/p/CUAu340MAPo/embed" allowtransparency="true" frameborder="0" scrolling="no" width="200" height="300" style="width: 17vw;height: 43vh;"></iframe></div>
                                    <div class="col-6" style="padding: 0px;"><iframe src="https://www.instagram.com/p/CUAu8ilMXq1/embed" allowtransparency="true" frameborder="0" scrolling="no" width="200" height="300" style="width: 17vw;height: 43vh;"></iframe></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pb-5"><a class="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss" role="button" data-bs-dismiss="modal" style="margin: auto;margin-right: 5%;font-size: 2vw;"><i class="fa fa-close" style="font-size: 2vw;"></i>&nbsp;Close Project</a><a class="btn btn-primary btn-lg" role="button" style="border-radius: 800px;font-size: 2vw;margin: auto;margin-left: 5%;" target="_blank" href="https://www.instagram.com/deliens.s/">&nbsp;<i class="fa fa-link"></i>&nbsp;Open Code</a></div>
            </div>
        </div>
    </div><!-- Start: #ContactUs -->
    <div class="modal fade" role="dialog" tabindex="-1" id="ContactUs">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Contactez moi !</h4><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeContactUs()"></button>
                </div>
                <div class="modal-body">
                    <form id="contactUsForm" class="needs-validation" method="POST" novalidate="" action="">
                        <div class="row">
                            <div class="col" style="padding: 10px;">
                                <h6 class="text-start" style="margin: 0px;margin-left: 10px;margin-bottom: 5px;" for="firstnameInput">Prénom</h6>
                                <input class="form-control" type="text" id="firstnameInput" name="firstnameInput" placeholder="Prénom" required="" minlength="3" maxlength="10" value="">
                                <div class="valid-feedback">
                                    <p class="text-start" style="color: var(--bs-success);font-size: 12px;margin: 0px;margin-top: 5px;margin-left: 10px;">Tout est bon ici !</p>
                                </div>
                                <div class="invalid-feedback">
                                    <p class="text-start" style="margin: 0px;margin-top: 5px;margin-left: 10px;font-size: 12px;color: var(--bs-danger);">S'il vous plait, complêtez ce champ</p>
                                </div>
                            </div>
                            <div class="col" style="padding: 10px;">
                                <h6 class="text-start" style="margin: 0px;margin-left: 10px;margin-bottom: 5px;" for="nameInput">Nom</h6>
                                <input class="form-control" type="text" id="nameInput" name="nameInput" placeholder="Nom" required="" minlength="3" maxlength="15" value="">
                                <div class="valid-feedback">
                                    <p class="text-start" style="color: var(--bs-success);font-size: 12px;margin: 0px;margin-top: 5px;margin-left: 10px;">Tout est bon ici !</p>
                                </div>
                                <div class="invalid-feedback">
                                    <p class="text-start" style="margin: 0px;margin-top: 5px;margin-left: 10px;font-size: 12px;color: var(--bs-danger);">S'il vous plait, complêtez ce champ</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" style="padding: 10px;">
                                <h6 class="text-start" style="margin: 0px;margin-left: 10px;margin-bottom: 5px;" for="emailInput">Mail</h6>
                                <div class="input-group"><span class="input-group-text">@</span><input class="form-control" type="email" id="emailInput" name="emailInput" inputmode="email" required="" value="">
                                    <div class="input-group-text valid-feedback" style="background: transparent;border-style: none;padding: 0px;margin: 0px;">
                                        <p class="text-start" style="color: var(--bs-success);font-size: 12px;margin: 0px;margin-top: 5px;margin-left: 10px;">Tout est bon ici !</p>
                                    </div>
                                    <div class="input-group-text invalid-feedback" style="border-style: none;background: transparent;padding: 0px;margin: 0px;">
                                        <p class="text-start" style="margin: 0px;margin-top: 5px;margin-left: 10px;font-size: 12px;color: var(--bs-danger);">S'il vous plait, complêtez ce champ</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col" style="padding: 10px;">
                                <h6 class="text-start" style="margin: 0px;margin-left: 10px;margin-bottom: 5px;" for="phoneInput">Téléphone</h6>
                                <div class="input-group"><span class="input-group-text">0</span><input class="form-control" type="tel" id="phoneInput" name="phoneInput" placeholder="Téléphone" inputmode="tel" minlength="9" maxlength="9">
                                    <div class="input-group-text valid-feedback" style="background: transparent;border-style: none;margin: 0px;padding: 0px;">
                                        <p class="text-start" style="color: var(--bs-success);font-size: 12px;margin: 0px;margin-top: 5px;margin-left: 10px;">Tout est bon ici !</p>
                                    </div>
                                    <div class="input-group-text invalid-feedback" style="border-style: none;background: transparent;margin: 0px;padding: 0px;">
                                        <p class="text-start" style="margin: 0px;margin-top: 5px;margin-left: 10px;font-size: 12px;color: var(--bs-danger);">S'il vous plait, complêtez ce champ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" style="padding: 10px;">
                                <h6 class="text-start" style="margin: 0px;margin-left: 10px;margin-bottom: 5px;" for="messageInput">Message</h6>
                                <textarea class="form-control" id="messageInput" name="messageInput" style="height: 100px;" required="" maxlength="500" minlength="10"></textarea>
                                <div class="valid-feedback">
                                    <p class="text-start" style="color: var(--bs-success);font-size: 12px;margin: 0px;margin-top: 5px;margin-left: 10px;">Tout est bon ici !</p>
                                </div>
                                <div class="invalid-feedback">
                                    <p class="text-start" style="margin: 0px;margin-top: 5px;margin-left: 10px;font-size: 12px;color: var(--bs-danger);">S'il vous plait, complêtez ce champ</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" style="padding: 10px;"><button class="btn btn-primary" type="submit">Envoyer</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!-- End: #ContactUs -->
    <!-- Start: Popover division -->
    <div id="inssetPopoverContent" style="display: none;background: var(--bs-light);width: 500px;">
        <div class="table-responsive" style="border-style: none;">
            <table class="table">
                <thead style="width: 500px;border-style: none;">
                    <tr></tr>
                </thead>
                <tbody style="width: 500px;border-style: none;">
                    <tr style="width: 500px;border-style: none;">
                        <td style="width: 250px;padding: 5px 0px;border-bottom-style: none;">
                            <ul style="padding: 0px 10px;margin: 0px;list-style-type: none;text-align: center;">
                                <li>web (HTML / CSS / JS / PHP)</li>
                                <li style="margin-bottom: 10px;">Bases de données</li>
                                <li>Algorithmique</li>
                                <li style="margin-bottom: 10px;">Programmation orientée objet</li>
                                <li>Java</li>
                                <li style="margin-bottom: 10px;">MATLAB</li>
                                <li>Objets connectés</li>
                                <li>Informatique industrielle</li>
                                <li>Électronique industrielle</li>
                                <li>Logique combinatoire</li>
                            </ul>
                        </td>
                        <td style="width: 250px;padding: 5px 0px;border-bottom-style: none;">
                            <ul style="margin: 0px;list-style-type: none;border-left: 1px solid var(--bs-gray-300);padding: 0px 10px;text-align: center;">
                                <li>Traitement de signaux</li>
                                <li style="margin-bottom: 10px;">Mathématiques</li>
                                <li>Mécanique</li>
                                <li style="margin-bottom: 10px;">RDM</li>
                                <li>Méthodologie</li>
                                <li style="margin-bottom: 10px;">Anglais</li>
                                <li>Productique</li>
                                <li>CAO</li>
                                <li>Gestion de projet</li>
                                <li>Gestion de production</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div><!-- End: Popover division -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="assets/js/tooltips.js"></script>
</body>

</html>