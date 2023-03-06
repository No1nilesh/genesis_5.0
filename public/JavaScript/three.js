function init() {
    var style = ["style1", "style2", "style3", "style4"];
  
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    //meteoros
  
    var numeroAleatorio = 5000;
  
    setTimeout(function () {
      carregarMeteoro();
    }, numeroAleatorio);
  
    function carregarMeteoro() {
      setTimeout(carregarMeteoro, numeroAleatorio);
      numeroAleatorio = getRandomArbitrary(5000, 10000);
      var meteoro =
        "<div class='meteoro " + style[getRandomArbitrary(0, 4)] + "'></div>";
      document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = meteoro;
      setTimeout(function () {
        document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = "";
      }, 1000);
    }
  }
  window.onload = init;
  
  // gsap
  
  var scene = new THREE.Scene();
  document.addEventListener("mousemove", onMouseMove, false);
  var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var mouseX;
  var mouseY;
  
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor( 'red', 0 );
  document.body.appendChild(renderer.domElement);
  console.log(document.getElementsByClassName('space'))
  
  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);
  });
  
  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://images.squarespace-cdn.com/content/v1/5aa144ce7c9327dd78014514/1556604f-3f97-4ebd-b074-f661231dc71a/1.+Logo.png?format=1500w');
    
  const distance = Math.min(300, window.innerWidth);
  const geometry = new THREE.Geometry();
  const material = new THREE.PointsMaterial({
    // color: 'red',    // red (can also use a CSS color string here)
    flatShading: true,
  });
  
  for (var i = 0; i < 1600; i++) {
    var vertex = new THREE.Vector3();
  
    // var theta = THREE.Math.randFloatSpread(360);
    var theta = Math.acos(THREE.Math.randFloatSpread(2));
    var phi = THREE.Math.randFloatSpread(360);
  
    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    vertex.z = distance * Math.cos(theta);
  
    geometry.vertices.push(vertex);
  }
  var particles = new THREE.Points(
    geometry,
    material
  );
  particles.boundingSphere = 5;
  
  var renderingParent = new THREE.Group();
  renderingParent.add(particles);
  var resizeContainer = new THREE.Group();
  resizeContainer.add(renderingParent);
  scene.add(resizeContainer);
  
  // const background =
  // scene.background = 'red';
  camera.position.z = 360;
  
  var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  var myTween;
  function onMouseMove(event) {
    if (myTween) myTween.kill();
  
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    myTween = gsap.to(particles.rotation, {
      duration: 0.1,
      x: mouseY * -1,
      y: mouseX,
    });
  }
  animate();
  
  // Scaling animation
  var animProps = { scale: 1, xRot: 0, yRot: 0 };
  gsap.to(animProps, {
    duration: 16,
    scale: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine",
    onUpdate: function () {
      renderingParent.scale.set(
        animProps.scale,
        animProps.scale,
        animProps.scale
      );
    },
  });
  
  gsap.to(animProps, {
    duration: 1000,
    xRot: Math.PI * 2,
    yRot: Math.PI * 4,
    repeat: -1,
    yoyo: true,
    ease: "none",
    onUpdate: function () {
      renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
    },
  });