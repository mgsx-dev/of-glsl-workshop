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



float nsin(float x)
{
	return sin(x * 3.1415) * 0.5 + 0.5;
}

float func(float x, float amp)
{
	return amp * sin(x) * 0.5 + 0.5;
}

float sbin(float a, float b, float range)
{
	return smoothstep(-range, range, a - b);
}

vec3 randcolor(vec2 v)
{
	float s1 = fract(sin(v.x * 3000.0 + v.y * 2000.0 + 2000.0));
	float s2 = fract(sin(s1 * 3000.0));
	float s3 = fract(sin(s2 * 3000.0));
	return vec3(s1, s2, s3);
}

float nz(float v)
{
	return fract(sin(floor(v) * 5439.876 + 1336.5932)) * 2.0 - 1.0;
}

float nz2(vec2 v)
{
	return fract(sin(floor(v.x) * 235673.432 + floor(v.y) * 2986.467 + 1336.5932)) * 2.0 - 1.0;
}
vec2 nz22(vec2 v)
{
	return vec2(nz2(v * 123654.6), nz2(v * 456.765));
}

float h(float t)
{
  return t * t * (3.0 - 2.0 * t);
}

float snz2(vec2 v)
{
	return mix(
		mix(nz2(v), nz2(v + vec2(1.0, 0.0)), h(fract(v.x))),
		mix(nz2(v + vec2(0.0, 1.0)), nz2(v + vec2(1.0, 1.0)), h(fract(v.x))), h(fract(v.y)));
		
}
vec2 snz22(vec2 v)
{
	return mix(
		mix(nz22(v), nz22(v + vec2(1.0, 0.0)), h(fract(v.x))),
		mix(nz22(v + vec2(0.0, 1.0)), nz22(v + vec2(1.0, 1.0)), h(fract(v.x))), h(fract(v.y)));
		
}

float cloud(vec2 v)
{
	return snz2(v) + snz2(v * 2) * 0.5 + snz2(v * 4) * 0.25;
}

// entry point
void main()
{
float opac = abs(dot(normalize(-N), normalize(-I)));

vec3 ref = -reflect(normalize(-I), normalize(-N));

vec3 rm = 1 - abs(ref);

opac = pow(opac, 10);

float anim = sin(time) * 0.5 + 0.5;

float cld = abs(cloud(ref.xy * 2) * 0.5 + 0.5);

float smooth = 0.1;

vec3 col = mix(
	mix(vec3(1), vec3(0.5,0.7, 1), cld), 
	mix(vec3(0.1), vec3(0.5,0.3, 0.1), cld),
	smoothstep(-smooth, smooth, ref.y));

gl_FragColor = vec4((opac * 0.9 + 0.1) * (col * 0.8 + 0.2), 1);
}