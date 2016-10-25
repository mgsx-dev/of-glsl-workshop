#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 


	float value = (sin(pos.x * 3.1415 * 2.0 * 10.0) * cur.y + 1.0) * 0.5;
	
	float lum = smoothstep(0.0, 0.5, value - pos.y);
	
	gl_FragColor = vec4(lum, lum, lum, 1.0);
}