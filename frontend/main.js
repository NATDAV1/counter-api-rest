document.addEventListener('DOMContentLoaded', function () {
    // declarations
    ///////////////
    const baseApiUrl = 'http://localhost:4000';
    const counterNode = document.querySelector('.counter');

    const updateCounterDOM = (value) => {
        counterNode.innerText = String(value)
    }

    // get initial value from backend
    fetch(baseApiUrl + '/data')
        .then(response => response.json())
        .then(data => {
            document.querySelector("main").style.backgroundColor = data.color
            updateCounterDOM(data.counterValue)
        })

    // Listeners
    ////////////

    // listener for incremente
    document.querySelector('header .increment').addEventListener('click', () => {
        // increment counter


        fetch(baseApiUrl + '/increment')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })

    })

    // listener for increment by
    document.querySelector('header .incrementBy').addEventListener('keyup', (ev) => {
        if (ev.keyCode === 69 || ev.keyCode === 190) {
            ev.target.value = ""
        }
        if (ev.keyCode === 13) {
            let amount = ev.target.value;

            fetch(baseApiUrl + '/incrementBy/' + amount)
                .then(res => res.json())
                .then(data => {
                    updateCounterDOM(data.counterValue)
                    ev.target.value = '';
                })
                .catch(console.error)


        }
    })


    // listener for decrement
    document.querySelector('.decrement').addEventListener('click', () => {
        // increment counter
        fetch(baseApiUrl + '/decrement')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })

    })
    //listener for decrement by
    document.querySelector('header .decrementBy').addEventListener('keyup', (ev) => {

        if (ev.keyCode === 69 || ev.keyCode === 190) {
            ev.target.value = ""
        }
        if (ev.keyCode === 13) {
            let amount = ev.target.value;

            fetch(baseApiUrl + '/decrementBy/' + amount)
                .then(res => res.json())
                .then(data => {
                    updateCounterDOM(data.counterValue)
                    ev.target.value = '';
                })
                .catch(console.error)


        }
    })

    //listener for color picker
    document.querySelector('header .picker').addEventListener('change', (ev) => {
        // console.log(ev.target.value)
        let newColor = encodeURIComponent(ev.target.value);
        console.log(newColor);

        let endpoint = baseApiUrl + '/picker/' + newColor;
        console.log(endpoint);

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                //   let contrast = getContrastRatio('#fff', data.color);
                // console.log(contrast);
                let doc = document.querySelector('main');
                doc.style.backgroundColor = data.color;

                // if (contrast > 2) {
                //     doc.style.color = "#fff";

                // } else {
                //     doc.style.color = "#000";

                // }


            })
    })
    //listener for reset
    document.querySelector('header .reset').addEventListener('click', () => {

        fetch(baseApiUrl + "/reset")
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)

            })
    })

})