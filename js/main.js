var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

THREE.EllipsoidGeometry = function ( width, height, depth, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

    THREE.SphereGeometry.call( this, width * 0.5, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );

    this.applyMatrix( new THREE.Matrix4().makeScale( 1.0, height/width, depth/width ) );

};
var sphere;
THREE.EllipsoidGeometry.prototype = Object.create( THREE.Geometry.prototype );

var loader = new THREE.TextureLoader();
loader.load('saturn.jpg', function ( texture ) {
  var geometry = new THREE.EllipsoidGeometry( (2*75000)/2500,(2*55000)/2500,(2*75000)/2500,20,20,0,Math.PI*2,0,Math.PI );
  var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
});

/*var texture = new THREE.TextureLoader().load("venus.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
var sphere = new THREE.Mesh( geometry, material );
var geo = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry( geometry )
var mat = new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 2 } );
var wireframe = new THREE.LineSegments( geo, mat );*/

var geometry2 = new THREE.EllipsoidGeometry( 2*75000/2500,2*75000/2500,2*75000/2500, 32, 32,0,Math.PI*2,0,Math.PI );
var material2 = new THREE.MeshBasicMaterial( {color: 0xff000} );
var sphere2 = new THREE.Mesh( geometry2, material2 );
//scene.add( sphere2 );
var geo2 = new THREE.EdgesGeometry(geometry2);
var mat2 = new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 2 } );
var wireframe2 = new THREE.LineSegments( geo2, mat2 );
//scene.add( wireframe );
//scene.add( sphere );
//scene.add(sphere2);
scene.add(wireframe2);
var squash = 0;
var rot = 0;
var up = true;
function animate(){
	requestAnimationFrame(animate);
	sphere.rotation.y+=.01
	//sphere.rotation.y+=.01
	//sphere.rotation.y+=.01;
		
	scene.remove(wireframe2);
	geometry2 = new THREE.EllipsoidGeometry(60,60-(squash),60,32,32,0,Math.PI*2,0,Math.PI);
	sphere2 = new THREE.Mesh(geometry2,material2);
	wireframe2 = new THREE.LineSegments(new THREE.EdgesGeometry(geometry2),mat2);
	scene.add(wireframe2);
	rot+=.01;
	wireframe2.rotation.y=rot;
	if(up){
		squash=squash+.1;
	}else{
		squash=squash-.1;
	}
	if(squash>16){
		up=false;
		console.log("flip")
	}
	if(squash<0){
		up=true;
	}
	
	
	renderer.render(scene,camera);
}
var render = function () {

	requestAnimationFrame( render );

	renderer.render( scene, camera );

};
window.addEventListener( 'resize', function () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}, false );
animate();
//render();