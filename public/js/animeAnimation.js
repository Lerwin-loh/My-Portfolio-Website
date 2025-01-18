let header = document.querySelector('.index_title .index_title_header')

header.innerHTML = header.innerText.split("").map(function (char) {
    if (char == " ") {
        char = "&nbsp;";
    }
    return "<span>" + char + "</span>";
}).join("");


anime({
    targets: ".index_title .index_title_header span",
    loop: true,
    scale: [1.1, 1],
    opacity: [0, 1],
    duration:7000,
    delay: function (element, i) {
        return i * 200
    }
})



anime({
    targets: ['.cloud', '.cloud_3'],
    translateX: 80,
    direction: 'alternate',
    duration:7000,
    loop: true,
    easing: 'easeInOutSine',
    scale:0.8,
  });

  anime({
    targets: ['.cloud_2'],
    translateX: 100,
    direction: 'alternate',
    duration: 9000,
    loop: true,
    easing: 'easeInOutSine',
    
  });

  anime({
    targets: ['.cloud_4'],
    translateX: 100,
    direction: 'alternate',
    duration: 9000,
    loop: true,
    easing: 'easeInOutSine',
    scale:1.3,
  });


  anime({
    targets: ['.lava_ball1'],
    translateY: -180,
    // direction: 'alternate',
    duration: 9000,
    loop: true,
    easing: 'easeInOutSine',
    scale:0,
  });

  anime({
    targets: ['.lava_ball2'],
    translateY: -150,
    // direction: 'alternate',
    duration: 11000,
    loop: true,
    easing: 'easeInOutSine',
    scale:0,
  });

  anime({
    targets: ['.lava_ball3'],
    translateY: -130,
    // direction: 'alternate',
    duration: 13000,
    loop: true,
    easing: 'easeInOutSine',
    scale:0,
  });


  anime({
    targets: ['.lava_puddle'],
    
    direction: 'alternate',
    duration: 5000,
    loop: true,
    easing: 'easeInOutSine',
    translateY: -40,
    rotateX: '20',
    rotateY:"10",
  });

  

  // anime({
  //   targets: ['.tooltip-container2', '.tooltip-container4'],
  //   translateY: 50,
  //   direction: 'alternate',
  //   duration: 7000,
  //   loop: true,
  //   easing: 'easeInOutSine'
  // });

  // anime({
  //   targets: ['.tooltip-container1', '.tooltip-container3'],
  //   translateY: -50,
  //   direction: 'alternate',
  //   duration: 6500,
  //   loop: true,
  //   easing: 'easeInOutSine'
  // });


//   .tooltip-container2 .tooltip-container3 .tooltip-container4 .tooltip-container5 .tooltip-container6'