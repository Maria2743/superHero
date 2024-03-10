$(document).ready(function () {
    const formSuperHero = $("#formSuperHero")
    const superHeroNumber = $("#superHeroNumber")
    const superHeroResultado = $("#superHeroResultado")
    const charContainer = $("#charContainer")


    formSuperHero.on("submit", function (event) {
        event.preventDefault()

        superHeroNumber.removeClass("is-valid is-invalid")

        const superHeroNumberUser = parseInt($('#superHeroNumber').val());

        if (superHeroNumberUser > 0 && superHeroNumberUser < 732) {
            console.log("El valor esta correcto");
            superHeroNumber.addClass("is-valid");
            getSuperHero(superHeroNumberUser)
        } else {
            console.log("El valor es incorrecto");
            superHeroNumber.addClass("is-invalid");
        }

    })

    const getSuperHero = (superHeroNumberApi) => {

        $.ajax({
            url: "https://superheroapi.com/api.php/4905856019427443/" + superHeroNumberApi,
            method: "GET",
            success(superHero) {

                const mySuperHero = {
                    image: superHero.image.url,
                    name: superHero.name,
                    conexiones: superHero.connections["group-affiliation"],
                    ocupacion: superHero.work.occupation,
                    primera_aparicion: superHero.biography["first-appearance"],
                    altura: superHero.appearance.height,
                    peso: superHero.appearance.weight,
                    alianzas: superHero.biography.aliases,
                    poder: superHero.powerstats,

                }

                console.log("poder:", superHero.powerstats)

                superHeroResultado.html(`
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${mySuperHero.image}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body position-relative">
                            <h5 class="card-title">Encontraste tu SuperHero</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Nombre: ${mySuperHero.name}</li>
                                <li class="list-group-item">Conexiones: ${mySuperHero.conexiones}</li>
                                <li class="list-group-item">Ocupación: ${mySuperHero.ocupacion}</li>
                                <li class="list-group-item">Primera Aparación ${mySuperHero.primera_aparicion}</li>
                                <li class="list-group-item">Altura: ${mySuperHero.altura}</li>
                                <li class="list-group-item">Peso: ${mySuperHero.peso}</li>
                                <li class="list-group-item">Alianzas: ${mySuperHero.alianzas}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

                `)

                const dataPoints = [];
                $.each(mySuperHero.poder, function (label, value) {
                    dataPoints.push({ label: label, y: parseInt(value) });
                });


                const options = {
                    title: {
                        text: "Estadísticas de poder para " + mySuperHero.name
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: true,
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString: "#,##0.#" % "",
                        dataPoints: dataPoints
                    }]
                };

                // Renderizar el gráfico de pastel
                const chart = new CanvasJS.Chart("chartContainer", options);
                chart.render();

            },
            error(error) {
                console.log(error)
            }
        })
    }

})

