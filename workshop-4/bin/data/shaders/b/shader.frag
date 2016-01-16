#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

varying vec3 vPos;

void main()
{
	gl_FragColor = vec4(vPos.x, vPos.y, vPos.z, 1.0);
}