#version 120

uniform float time;
// vertex to fragment shader io
varying vec3 V;
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

float anim = sin(time) * 0.5 + 0.5;

vec3 grid2 = smoothstep(vec3(0), vec3(0.05), sin(V * 10 * 2 *  3.1415) * 0.5 + 0.5);

float grid = 1 - (grid2.x * grid2.y * grid2.z);

opac = abs(opac);

opac = ambient + intensity*(1.0-pow(opac, edgefalloff));

vec3 col1 = opac * Cs.xyz;

vec3 col2 = vec3(0, 0, grid);

vec3 col = mix(col1, col2, anim * 1.8 * pow(1 - opac, 2));

gl_FragColor = vec4(col, 1);
}