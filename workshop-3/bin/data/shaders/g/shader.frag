#version 120

uniform float time;
// vertex to fragment shader io
varying vec3 N;
varying vec3 I;
varying vec4 Cs;

// globals
float edgefalloff=.8;
float intensity=.5;
float ambient=.350;

// entry point
void main()
{
float opac = dot(normalize(-N), normalize(-I));

opac = abs(opac);

opac = ambient + intensity*(1.0-pow(opac, edgefalloff));

gl_FragColor =  opac * Cs;
gl_FragColor.a = opac;
}