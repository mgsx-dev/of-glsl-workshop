#version 120

uniform float time;
uniform vec2 size;
uniform vec2 mouse;

float nsin(float x)
{
	return sin(x * 3.1415) * 0.5 + 0.5;
}

void main()
{
	vec2 pos = vec2(gl_FragCoord.x / size.x, gl_FragCoord.y / size.y); 
	vec2 cur = vec2(mouse.x / size.x, mouse.y / size.y); 

	pos = pos * 2.0 - 1.0;
	
	float v = 1.0 - length(pos);
	vec2 pol = vec2(atan(pos.y, pos.x) / 3.1415, v);
	
	float vtime = time * 0.5;

	pol.y += nsin(pol.x * 10.0+vtime) * 0.1 * nsin(pol.x * 11.0+vtime * 0.2 + 4.5) + 
		nsin(pol.x * 4.0+vtime * 0.1) * 0.1;
	
	float circle = pol.y; //smoothstep(0.5, 0.52, sin(pol.y));
	
	float pcircle = pow(circle, 10.0);
	
	vec3 color = vec3(pcircle, pol.y * circle, pcircle);
	
	gl_FragColor = vec4(color, 1.0);
}