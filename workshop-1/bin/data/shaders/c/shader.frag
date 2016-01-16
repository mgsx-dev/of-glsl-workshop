#version 120

uniform float time;
uniform vec2 size;

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	
	gl_FragColor = vec4(pos.x, pos.y, 0.0, 1.0);
}