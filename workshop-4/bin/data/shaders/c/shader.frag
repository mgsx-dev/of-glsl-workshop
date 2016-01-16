#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

varying vec3 vPos;

void main()
{
	float lum = vPos.z * 0.1;

	vec3 color = mix(vec3(0.0, 0.5, 0.5), vec3(1.0, 1.0, 1.0), lum);

	gl_FragColor = vec4(color, 1.0);
}