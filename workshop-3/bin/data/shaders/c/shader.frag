#version 120

uniform float time;
// vertex to fragment shader io
varying vec3 V;
varying vec3 N;
varying vec3 I;
varying vec4 Cs;

float grid(float v, float size, float thin)
{
	return fract(v * size) > thin ? 1.0 : 0.0;
}
float grid3(vec3 v, float size, float thin)
{
	return grid(v.x, size, thin) * grid(v.y, size, thin) * grid(v.z, size, thin);
}

// entry point
void main()
{
float opac = abs(dot(normalize(-N), normalize(-I))) * 0.5;

float freq = 7;

opac += (1 - grid3(V, freq, 0.1)) * 0.4;

gl_FragColor = vec4(opac, opac, opac, 1);
}