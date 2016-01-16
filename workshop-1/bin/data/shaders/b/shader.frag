#version 120

uniform float time;

void main()
{
	float value = fract(time);
	gl_FragColor = vec4(1.0, 0.5, 0.0, value);
}