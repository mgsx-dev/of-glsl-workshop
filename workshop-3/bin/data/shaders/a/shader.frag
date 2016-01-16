#version 120

uniform float time;

varying vec3 V;
varying vec3 N;
varying vec3 I;


void main()
{
	float diffuse = abs(dot(normalize(-N), normalize(-I)));
	
	gl_FragColor = vec4(diffuse, diffuse, diffuse, 1);
}