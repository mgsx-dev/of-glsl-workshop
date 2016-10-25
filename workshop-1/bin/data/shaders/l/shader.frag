#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 
	
	pos = pos * 2.0 - 1.0;
	
	float v = 1.0 - length(pos);
	vec2 pol = vec2(atan(pos.y, pos.x) / 3.1415, v);
	
	
	float circle = sin(pol.x * 30000.0 * cur.x) * 0.5 + 0.5; // smoothstep(0.5, 0.52, v);
	
	vec3 color = vec3(circle, circle, circle);
	
	gl_FragColor = vec4(color, 1.0);
}