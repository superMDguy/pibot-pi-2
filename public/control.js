window.onload = () => {
    const origin = window.location.origin + ':5000'

    let current_turn = '' // TODO: use observables
    let current_drive = ''

    function forward() {
        if (current_drive !== 'forward') {
            current_drive = 'forward'
            console.debug('forward')
            fetch(origin + '/run/go', { mode: 'no-cors' })
        }
    }

    function back() {
        if (current_drive !== 'back') {
            current_drive = 'back'
            console.debug('back')
            fetch(origin + '/run/back', { mode: 'no-cors' })
        }
    }

    function stop_driving() {
        current_drive = ''
        console.debug('stop driving')
        fetch(origin + '/run/stop_drive', { mode: 'no-cors' })
    }

    function left() {
        if (current_turn !== 'left') {
            current_turn = 'left'
            console.debug('turn left')
            fetch(origin + '/run/left', { mode: 'no-cors' })
        }
    }

    function right() {
        if (current_turn !== 'right') {
            current_turn = 'right'
            console.debug('turn right')
            fetch(origin + '/run/right', { mode: 'no-cors' })
        }
    }

    function stop_turning() {
        current_turn = ''
        console.debug('stop turning')
        fetch(origin + '/run/stop_turn', { mode: 'no-cors' })
    }

    // Onscreen Button Controls
    document.querySelector('#forward').addEventListener('mousedown', forward)
    document.querySelector('#forward').addEventListener('mouseup', stop_driving)
    document.querySelector('#forward').addEventListener('touchstart', forward)
    document.querySelector('#forward').addEventListener('touchend', stop_driving)


    document.querySelector('#back').addEventListener('mousedown', back)
    document.querySelector('#back').addEventListener('mouseup', stop_driving)
    document.querySelector('#back').addEventListener('touchstart', back)
    document.querySelector('#back').addEventListener('touchend', stop_driving)


    document.querySelector('#left').addEventListener('mousedown', left)
    document.querySelector('#left').addEventListener('mouseup', stop_turning)
    document.querySelector('#left').addEventListener('touchstart', left)
    document.querySelector('#left').addEventListener('touchend', stop_turning)


    document.querySelector('#right').addEventListener('mousedown', right)
    document.querySelector('#right').addEventListener('mouseup', stop_turning)
    document.querySelector('#right').addEventListener('touchstart', right)
    document.querySelector('#right').addEventListener('touchend', stop_turning)

    // Keyboard Controls

    window.addEventListener('keydown', ({ code }) => {
        switch (code) {
            case 'ArrowUp':
                forward()
                break
            case 'ArrowDown':
                back()
                break
            case 'ArrowLeft':
                left()
                break
            case 'ArrowRight':
                right()
                break
        }
    })

    window.addEventListener('keyup', ({ code }) => {
        if (code === 'ArrowUp' || code === 'ArrowDown') {
            stop_driving()
        } else if (code === 'ArrowLeft' || code === 'ArrowRight') {
            stop_turning()
        }
    })

    // Speech commands

    if (annyang) {
        var commands = {
            'go': forward,
            back,
            'stop': stop_driving,
        };

        annyang.addCommands(commands);
        annyang.start();
    }
}
